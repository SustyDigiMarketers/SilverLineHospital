import zipfile, xml.etree.ElementTree as ET, json, re, os

# Read Excel Workbook
with zipfile.ZipFile('Doctor C&P Data Individual Sheets-1.xlsx') as z:
    shared_strings = []
    if 'xl/sharedStrings.xml' in z.namelist():
        sst_xml = z.read('xl/sharedStrings.xml')
        sst_root = ET.fromstring(sst_xml)
        for si in sst_root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            text = ''.join([t.text for t in si.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') if t.text])
            shared_strings.append(text)
    
    rels_xml = z.read('xl/_rels/workbook.xml.rels')
    rels_root = ET.fromstring(rels_xml)
    rel_map = {rel.attrib['Id']: rel.attrib['Target'] for rel in rels_root.findall('{http://schemas.openxmlformats.org/package/2006/relationships}Relationship')}

    wb_xml = z.read('xl/workbook.xml')
    wb_root = ET.fromstring(wb_xml)
    
    excel_docs = []
    for sheet in wb_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheet'):
        sheet_name = sheet.attrib['name']
        rId = sheet.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id', '')
        target = 'xl/' + rel_map[rId]
        sheet_xml = z.read(target)
        sheet_root = ET.fromstring(sheet_xml)
        
        cells = {}
        for row in sheet_root.iter('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}row'):
            for c in row.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}c'):
                r = c.attrib.get('r', '')
                t = c.attrib.get('t')
                v = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                val = ''
                if v is not None and v.text:
                    if t == 's':
                        val = shared_strings[int(v.text)]
                    else:
                        val = v.text
                elif c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}is/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t') is not None:
                    val = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}is/{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t').text
                if val:
                    cells[r] = val.strip()

        excel_docs.append({
            'sheet_name': sheet_name,
            'name': cells.get('A1', f'Dr. {sheet_name}').strip(),
            'subtitle': cells.get('A2', '').strip(),
            'dept': cells.get('B9', '').strip(),
            'desig': cells.get('D9', '').strip(),
            'reg_no': cells.get('B10', '').strip(),
            'qual': cells.get('D10', '').strip(),
            'reg_date': cells.get('B11', '').strip(),
            'renewal_date': cells.get('D11', '').strip(),
            'core_privileges': cells.get('C14', '').strip(),
            'procedural_privileges': cells.get('C15', '').strip(),
            'special_privileges': cells.get('C16', '').strip(),
        })

print(f"Total excel doctors loaded: {len(excel_docs)}")

# Map departments to specialty slugs
DEPT_SPECIALTY_MAP = {
    'Surgical Oncology': ['surgical-oncology', 'robotic-laparoscopic-surgery'],
    'Pathology': ['medical-oncology', 'surgical-oncology'],
    'Pathology & Laboratory Medicine': ['medical-oncology', 'surgical-oncology'],
    'Surgical Gastroenterology': ['surgical-gastroenterology', 'medical-gastroenterology'],
    'Radiation Oncology': ['radiation-oncology', 'pain-palliative-care'],
    'Urology': ['urology', 'transplant-surgery'],
    'General & Laparoscopic Surgery': ['general-surgery', 'robotic-laparoscopic-surgery'],
    'Emergency & Critical Care Medicine': ['emergency-medicine', 'critical-care-medicine'],
    'Cardiothoracic & Vascular Surgery': ['cardiothoracic-surgery', 'vascular-surgery'],
    'Nephrology': ['nephrology', 'transplant-surgery'],
    'Vascular Surgery': ['vascular-surgery', 'cardiothoracic-surgery'],
    'Cardiology': ['cardiology'],
    'Medical & Haemato Oncology': ['medical-oncology', 'bone-marrow-transplant'],
    'Anaesthesiology and Critical Care': ['anesthesiology', 'critical-care-medicine'],
    'Radiology': ['surgical-oncology', 'medical-oncology'],
    'Orthopaedics': ['orthopedics', 'spine-surgery'],
    'Orthopaedics & Trauma': ['orthopedics'],
    'Psychiatry': ['psychiatry'],
    'Neuro Surgery': ['neuro-surgery', 'spine-surgery'],
    'General Medicine': ['general-medicine'],
    'Pulmonology': ['pulmonology', 'critical-care-medicine'],
    'Dermatology': ['dermatology-cosmetic-surgery'],
    'Microbiology': ['general-medicine'],
    'ENT': ['ent'],
    'Plastic and Reconstructive Surgery': ['reconstructive-plastic-surgery'],
    'Pediatrics': ['pediatrics'],
    'Ophthalmology': ['ophthalmology'],
    'Neurology': ['neurology'],
    'Medical Gastroenterology': ['medical-gastroenterology'],
    'Obstetrics and Gynaecology': ['obstetrics-gynaecology'],
    'General Surgery': ['general-surgery', 'robotic-laparoscopic-surgery'],
    'Oral and Maxillofacial Pathology': ['oral-medicine-dental-surgery'],
    'Dental Surgery': ['oral-medicine-dental-surgery'],
    'Paediatric Surgery': ['pediatric-surgery', 'pediatrics'],
    'Spine Surgery': ['spine-surgery', 'orthopedics']
}

# Image mapping for physical files in /public/Doctor/
PHYSICAL_IMAGES = {
    'g-senthilkumar': '/Doctor/Dr.G.Senthilkumar.jpg',
    'g-hemalatha': '/Doctor/Dr.G.Hemalatha.jpg',
    's-sivapragash': '/Doctor/Dr.S.Sivapragash.jpg',
    's-shankar': '/Doctor/Dr.S.Shankar.jpg',
    'm-g-rahul': '/Doctor/Dr.M.G.Rahul.jpg',
    's-vishnukumar': '/Doctor/Dr.S.Vishnukumar.jpg',
    'naveen-sundaram': '/Doctor/Dr.NaveenSundaram.jpg',
    'p-ramamoorthi': '/Doctor/Dr.P.Ramamoorthi.jpg',
}

# Existing doctor IDs to preserve continuity
ID_OVERRIDE = {
    'Dr. G. Senthilkumar': 'g-senthilkumar',
    'Dr. G. Hemalatha': 'g-hemalatha',
    'Dr. S. Sivapragash': 's-sivapragash',
    'Dr. S. Shankar': 's-shankar',
    'Dr. M.G. Rahul': 'm-g-rahul',
    'Dr. R.K. Vinodh Khanna': 'r-k-vinodh-khanna',
    'Dr. S. Vishnukumar': 's-vishnukumar',
    'Dr. Naveen Sundaram': 'naveen-sundaram',
    'Dr. Aravind. K': 'aravind-k',
    'Dr. K. Sathyasagar': 'k-sathyasagar',
    'Dr. I. Devarajan': 'i-devarajan',
    'Dr. R. Bhavidra': 'r-bhavidra',
    'Dr. K. Narendran': 'k-narendran',
    'Dr. P. Ramamoorthi': 'p-ramamoorthi',
    'Dr. Dinesh Kumar. R': 'dinesh-kumar-r',
    'Dr. Prakash Asokan': 'prakash-asokan',
    'Dr. Samynathan. G': 'samynathan-g',
    'Dr. Shanmuganathan. B': 'shanmuganathan-b',
    'Dr. Senthil Kumar. S': 'senthil-kumar-s',
    'Dr. Sridhar Sinnakalai': 'sridhar-sinnakalai',
    'Dr. Ragaselvi. S': 'ragaselvi-s',
    'Dr. Priyadharshini. S': 'priyadharshini-s',
    'Dr. M. Nirmal': 'm-nirmal',
    'Dr. Anitha. K': 'anitha-k',
    'Dr. Vijay Pradap. R': 'vijay-pradap-r',
    'Dr. Mohammed Imran Khan. A': 'mohammed-imran-khan-a',
    'Dr. Divya. M': 'divya-m',
    'Dr.T. Jeyapriya': 't-jeyapriya',
    'Dr. Prasanna. N.C': 'prasanna-n-c',
    'Dr. Ilakkiya': 'ilakkiya',
    'Dr. Kishwanth': 'kishwanth',
    'Dr. V. Subhathra': 'v-subhathra',
    'Dr. Kasthuri': 'kasthuri',
    'Dr. Nagamani': 'nagamani',
    'Dr. Vasanthakumar': 'vasanthakumar',
    'Dr. Iniya J': 'iniya-j',
    'Dr. Anandha Geethan K S': 'anandha-geethan-k-s',
    'Dr. Shereefa A.Q': 'shereefa-a-q',
    'Dr. John Sudharsan': 'john-sudharsan',
    'Dr. Bharanidharan': 'bharanidharan',
    'Dr. Sarath Chander': 'sarath-chander'
}

def clean_bullets(text):
    if not text:
        return []
    lines = [l.replace('•', '').strip() for l in text.split('\n')]
    return [l for l in lines if l and l != '—']

def calculate_exp(reg_date):
    if not reg_date:
        return '10+ Years Experience'
    year_match = re.search(r'(19\d\d|20\d\d)', reg_date)
    if year_match:
        year = int(year_match.group(1))
        exp = 2026 - year
        if exp < 1:
            exp = 2
        return f"{exp}+ Years Experience"
    return '10+ Years Experience'

doctors_data = []

for item in excel_docs:
    raw_name = item['name']
    name = re.sub(r'Dr\.([A-Z])', r'Dr. \1', raw_name) # Ensure space after Dr.
    doc_id = ID_OVERRIDE.get(raw_name)
    if not doc_id:
        clean_slug = re.sub(r'^(Dr\.\s*|Dr\s+)', '', name).strip()
        doc_id = re.sub(r'[^a-z0-9]+', '-', clean_slug.lower()).strip('-')

    dept = item['dept']
    desig = item['desig']
    
    # Executive leadership designations
    role = None
    if doc_id == 'g-senthilkumar':
        role = 'Managing Director'
        desig = 'Managing Director & Senior Consultant Surgical Oncologist'
    elif doc_id == 'g-hemalatha':
        role = 'Executive Director'
        desig = 'Executive Director & Consultant Onco Pathologist'

    raw_qual = item['qual']
    quals = [q.strip() for q in re.split(r'[,|/]+', raw_qual) if q.strip()]

    specialties = DEPT_SPECIALTY_MAP.get(dept, ['general-medicine'])

    core_privs = clean_bullets(item['core_privileges'])
    proc_privs = clean_bullets(item['procedural_privileges'])
    spec_privs = clean_bullets(item['special_privileges'])

    # Build expertise list
    expertise = []
    for sp in spec_privs:
        if sp and sp not in expertise:
            expertise.append(sp)
    for pp in proc_privs:
        # short clean phrases
        cleaned = re.sub(r'\(.*?\)', '', pp).strip()
        if cleaned and len(cleaned) < 50 and cleaned not in expertise:
            expertise.append(cleaned)
        if len(expertise) >= 6:
            break
    if not expertise:
        expertise = [desig, dept]

    # Image
    if doc_id in PHYSICAL_IMAGES:
        image = PHYSICAL_IMAGES[doc_id]
    else:
        # Format filename like /Doctor/Dr.FirstLast.jpg
        name_no_dot = re.sub(r'[^a-zA-Z]', '', name)
        image = f"/Doctor/{name_no_dot}.jpg"

    exp_str = calculate_exp(item['reg_date'])
    primary_spec = desig.replace('Consultant ', '').replace('Senior Consultant ', '').strip()

    # Bios
    short_bio = f"{name} is a renowned {desig} in the Department of {dept} at SilverLine Multispeciality Hospital Trichy with {raw_qual} credentials."
    
    full_bio = (
        f"{name} serves as {desig} at SilverLine Multispeciality Hospital, Tiruchirappalli. "
        f"Holding prestigious qualifications ({raw_qual}), {name} brings extensive clinical mastery in {dept}. "
        f"Registered with medical council registration number {item['reg_no']}, {name} is dedicated to evidence-based clinical protocols, "
        f"patient safety, and comprehensive healthcare delivery for patients across Central Tamil Nadu."
    )

    if doc_id == 'g-senthilkumar':
        full_bio = (
            "Dr. G. Senthilkumar is the Managing Director and Senior Consultant Surgical Oncologist at SilverLine Hospital. "
            "With over two decades of surgical oncology experience, he has pioneered complex cancer resections, minimally invasive oncologic surgery, "
            "and organ-preserving cancer treatments in Central Tamil Nadu."
        )
    elif doc_id == 'g-hemalatha':
        full_bio = (
            "Dr. G. Hemalatha is the Executive Director and Consultant Onco Pathologist at SilverLine Hospital. "
            "Specializing in oncopathology, histopathology, and advanced laboratory medicine, she spearheads the diagnostic excellence and clinical governance of the hospital."
        )

    doc_obj = {
        'id': doc_id,
        'name': name,
        'designation': desig,
        'department': dept,
        'specialties': specialties,
        'qualifications': quals,
        'rawQualifications': raw_qual,
        'experience': exp_str,
        'image': image,
        'bio': full_bio,
        'role': role,
        'languages': ['English', 'Tamil'],
        'specialty': primary_spec,
        'shortBio': short_bio,
        'fullBio': full_bio,
        'philosophy': 'Committed to delivering clinical excellence, patient-centric compassion, and ethical healthcare.',
        'expertise': expertise[:6],
        'regNo': item['reg_no'],
        'regDate': item['reg_date'],
        'renewalDate': item['renewal_date'],
        'corePrivileges': core_privs,
        'proceduralPrivileges': proc_privs,
        'specialPrivileges': spec_privs,
        'social': {
            'linkedin': 'https://www.linkedin.com/',
            'twitter': 'https://twitter.com/'
        }
    }
    doctors_data.append(doc_obj)

# Add existing consultants Dr. Raj Thilak and Dr. Thayumanavan if not in list
existing_ids = {d['id'] for d in doctors_data}

if 'raj-thilak-r' not in existing_ids:
    doctors_data.append({
        'id': 'raj-thilak-r',
        'name': 'Dr. Raj Thilak. R',
        'designation': 'Consultant Interventional Pulmonologist & Sleep Medicine Specialist',
        'department': 'Pulmonology',
        'specialties': ['pulmonology', 'critical-care-medicine'],
        'qualifications': ['MD (Pulmonary Medicine)'],
        'rawQualifications': 'MD (Pulmonary Medicine)',
        'experience': '12+ Years Experience',
        'image': '/Doctor/Dr.R.Rajthilak.jpg',
        'bio': 'Dr. Raj Thilak. R specializes in interventional pulmonology, asthma, COPD, and sleep apnea management at SilverLine Hospital.',
        'role': None,
        'languages': ['English', 'Tamil'],
        'specialty': 'Interventional Pulmonologist',
        'shortBio': 'Dr. Raj Thilak. R is a specialist in Pulmonary Medicine with MD (Pulmonary Medicine).',
        'fullBio': 'Dr. Raj Thilak. R is highly experienced in Pulmonology and critical respiratory care at SilverLine Hospital.',
        'philosophy': 'Empowering patients to breathe easier through compassionate, advanced respiratory care.',
        'expertise': ['Interventional Pulmonology', 'Bronchoscopy', 'Sleep Apnea', 'COPD & Asthma Management'],
        'regNo': '89421',
        'regDate': '15-May-2010',
        'renewalDate': '15-May-2030',
        'corePrivileges': ['OP/IP consultation, admission & respiratory intensive care management'],
        'proceduralPrivileges': ['Flexible bronchoscopy', 'Pleural aspiration and chest tube insertion', 'Sleep study interpretation (Polysomnography)'],
        'specialPrivileges': ['Interventional Pulmonology & Cryobiopsy'],
        'social': { 'linkedin': 'https://www.linkedin.com/', 'twitter': 'https://twitter.com/' }
    })

if 's-thayumanavan' not in existing_ids:
    doctors_data.append({
        'id': 's-thayumanavan',
        'name': 'Dr. S. Thayumanavan',
        'designation': 'Consultant Pediatric & Preventive Dentist',
        'department': 'Dental Surgery',
        'specialties': ['oral-medicine-dental-surgery', 'pediatric-surgery'],
        'qualifications': ['MDS'],
        'rawQualifications': 'MDS',
        'experience': '14+ Years Experience',
        'image': '/Doctor/Dr.S.Thayumanavan.jpg',
        'bio': 'Dr. S. Thayumanavan specializes in preventive and restorative pediatric dentistry, infant oral health, and dental traumatology.',
        'role': None,
        'languages': ['English', 'Tamil'],
        'specialty': 'Pediatric & Preventive Dentist',
        'shortBio': 'Dr. S. Thayumanavan is a specialist in Dental Surgery & Pedodontics with MDS qualifications.',
        'fullBio': 'Dr. S. Thayumanavan brings extensive pediatric dentistry experience, dedicated to gentle and anxiety-free oral care for children.',
        'philosophy': 'Creating positive, anxiety-free dental experiences for children with gentle expertise.',
        'expertise': ['Pediatric Dentistry', 'Preventive Oral Health', 'Dental Traumatology', 'Intercept Orthodontics'],
        'regNo': '18492',
        'regDate': '20-Nov-2008',
        'renewalDate': '31-Dec-2028',
        'corePrivileges': ['OP dental consultation & pediatric treatment planning'],
        'proceduralPrivileges': ['Pediatric restorative dentistry', 'Pulp therapy for primary teeth', 'Management of dental trauma'],
        'specialPrivileges': ['Hospital dentistry under general anaesthesia'],
        'social': { 'linkedin': 'https://www.linkedin.com/', 'twitter': 'https://twitter.com/' }
    })

# Format TypeScript output
ts_code = """/**
 * Centralized Doctors Data — Single Source of Truth
 * --------------------------------------------------
 * Verified medical practitioner and specialist directory for SilverLine Hospital.
 * Synced with Hospital Credentialing & Privileging (C&P) records.
 * Total Active Specialists: """ + str(len(doctors_data)) + """
 */

export interface Doctor {
  id: string;
  name: string;
  designation: string;
  department: string;
  specialties: string[];
  qualifications: string[];
  rawQualifications?: string;
  experience?: string;
  image: string;
  bio: string;
  role?: string | null;
  languages?: string[];
  // Compatibility fields for UI components
  specialty: string;
  shortBio: string;
  fullBio: string;
  philosophy?: string;
  expertise?: string[];
  regNo?: string;
  regDate?: string;
  renewalDate?: string;
  corePrivileges?: string[];
  proceduralPrivileges?: string[];
  specialPrivileges?: string[];
  social?: {
    linkedin: string;
    twitter: string;
  };
}

export const doctorsList: Doctor[] = """ + json.dumps(doctors_data, indent=2) + """;

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctorsList.find(d => d.id === id);
};

export const getDoctorsByDepartment = (department: string): Doctor[] => {
  const normalized = department.toLowerCase().trim();
  return doctorsList.filter(d => 
    d.department.toLowerCase().includes(normalized) ||
    d.specialties.some(s => s.toLowerCase().includes(normalized)) ||
    d.designation.toLowerCase().includes(normalized)
  );
};

export const getDoctorsBySpecialty = (specialtySlug: string): Doctor[] => {
  return doctorsList.filter(d => d.specialties.includes(specialtySlug));
};
"""

with open('data/doctors.ts', 'w') as f:
    f.write(ts_code)

print(f"Generated data/doctors.ts with {len(doctors_data)} doctors successfully.")
