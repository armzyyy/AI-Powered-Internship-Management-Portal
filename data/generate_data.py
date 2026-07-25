import json, random, csv

random.seed(42)

# ---------------------------------------------------------------
# Reference lists
# ---------------------------------------------------------------
UNIVERSITIES = [
    "North South University", "BRAC University", "Independent University Bangladesh (IUB)",
    "American International University-Bangladesh (AIUB)", "East West University",
    "United International University (UIU)", "Ahsanullah University of Science and Technology (AUST)",
    "University of Liberal Arts Bangladesh (ULAB)", "Daffodil International University",
    "Bangladesh University of Professionals (BUP)",
]
UNI_WEIGHTS = [17, 14, 10, 12, 9, 10, 9, 7, 7, 5]

DEPARTMENTS = [
    "Computer Science & Engineering", "Electrical & Electronic Engineering",
    "Business Administration", "Economics", "Civil Engineering",
    "English", "Pharmacy", "Architecture", "Public Health", "Media & Journalism",
]

MALE_FIRST = ["Rakibul","Tanvir","Imran","Shakib","Arafat","Fahim","Mahmudul","Sabbir","Naeem","Rezwan",
    "Shahriar","Zawad","Nafis","Asif","Rafi","Mehedi","Sajid","Tanzim","Rahat","Iqbal",
    "Sadman","Faisal","Ehsan","Ashraf","Jubayer","Rifat","Anik","Rakib","Sourav","Rayhan",
    "Nayeem","Zubair","Tahsin","Shovon","Hridoy","Piash","Wasif","Sifat","Mahin","Adnan"]
FEMALE_FIRST = ["Nusrat","Sadia","Farzana","Tasnim","Ayesha","Mim","Nabila","Samira","Israt","Jannatul",
    "Tania","Rima","Sumaiya","Farhana","Lamia","Tanjina","Rifah","Mahjabin","Anika","Proma",
    "Nowrin","Tahmina","Rukhsar","Mahbuba","Sharmin","Afsana","Nawshin","Ishrat","Priyanka","Kona",
    "Mou","Trisha","Orin","Nazia","Rumana","Shahana","Tuli","Bristy","Munira","Jerin"]
LAST_NAMES = ["Islam","Rahman","Hossain","Ahmed","Chowdhury","Khan","Akter","Alam","Karim","Uddin",
    "Haque","Siddique","Ali","Kabir","Sultana","Sarker","Bhuiyan","Mia","Talukder","Molla",
    "Sheikh","Reza","Nasrin","Parvin","Zaman","Aktar","Rashid","Mahmud","Ferdous","Jahan"]

DISTRICTS = ["Dhaka","Chattogram","Sylhet","Rajshahi","Khulna","Barishal","Rangpur","Mymensingh",
    "Comilla","Gazipur","Narayanganj","Bogura","Jessore","Cox's Bazar","Dinajpur"]

SKILLS_POOL = ["React","Node.js","Python","Java","C++","TypeScript","SQL","Django","Spring Boot",
    "Figma","UI/UX Design","Data Analysis","Machine Learning","AWS","Docker","Flutter","Kotlin",
    "Excel","PHP Laravel","MongoDB","Git","REST APIs","Power BI","TensorFlow","Cybersecurity Basics"]

DEGREES = ["Ph.D. in Computer Science", "Ph.D. in Electrical Engineering", "Ph.D. in Business Administration",
    "Ph.D. in Economics", "M.Sc. in Computer Science, Ph.D. candidate", "Ph.D. in Civil Engineering",
    "Ph.D. in Public Health", "Ph.D. in Applied Mathematics", "Ph.D. in Data Science"]

DESIGNATIONS = ["Lecturer", "Senior Lecturer", "Assistant Professor", "Associate Professor", "Professor"]
DESIG_WEIGHTS = [15, 15, 30, 25, 15]

RESEARCH_AREAS = ["Machine Learning","Computer Networks","Software Engineering","Human-Computer Interaction",
    "Renewable Energy Systems","Financial Economics","Structural Engineering","Data Privacy",
    "Natural Language Processing","Embedded Systems","Entrepreneurship","Public Policy",
    "Cloud Computing","Cybersecurity","Bioinformatics"]

# 100+ well-known companies operating in / native to Bangladesh, across sectors
COMPANIES_REAL = [
    ("bKash", "Fintech / Mobile Financial Services", "Dhaka"),
    ("Nagad", "Fintech / Mobile Financial Services", "Dhaka"),
    ("Pathao", "Ride-sharing & Logistics", "Dhaka"),
    ("Chaldal", "E-commerce / Grocery", "Dhaka"),
    ("Daraz Bangladesh", "E-commerce", "Dhaka"),
    ("Grameenphone", "Telecommunications", "Dhaka"),
    ("Robi Axiata", "Telecommunications", "Dhaka"),
    ("Banglalink", "Telecommunications", "Dhaka"),
    ("Square Group", "Pharmaceuticals & Conglomerate", "Dhaka"),
    ("Beximco Group", "Pharmaceuticals & Conglomerate", "Dhaka"),
    ("ACI Limited", "Conglomerate / Consumer Goods", "Dhaka"),
    ("Unilever Bangladesh", "FMCG", "Dhaka"),
    ("BAT Bangladesh", "FMCG", "Dhaka"),
    ("Marico Bangladesh", "FMCG", "Dhaka"),
    ("Nestlé Bangladesh", "FMCG", "Dhaka"),
    ("Berger Paints Bangladesh", "Manufacturing", "Dhaka"),
    ("Walton Group", "Electronics Manufacturing", "Gazipur"),
    ("Pran-RFL Group", "Consumer Goods / Manufacturing", "Dhaka"),
    ("City Bank", "Banking", "Dhaka"),
    ("BRAC Bank", "Banking", "Dhaka"),
    ("Eastern Bank Limited (EBL)", "Banking", "Dhaka"),
    ("Dutch-Bangla Bank", "Banking", "Dhaka"),
    ("Standard Chartered Bangladesh", "Banking", "Dhaka"),
    ("The City Bank", "Banking", "Dhaka"),
    ("IDLC Finance", "Financial Services", "Dhaka"),
    ("MetLife Bangladesh", "Insurance", "Dhaka"),
    ("Green Delta Insurance", "Insurance", "Dhaka"),
    ("Therap (BD)", "Software / HealthTech", "Dhaka"),
    ("Brain Station 23", "Software Development", "Dhaka"),
    ("Kaz Software", "Software Development", "Dhaka"),
    ("Selise Digital Platforms", "Software Development", "Dhaka"),
    ("Enosis Solutions", "Software Development", "Dhaka"),
    ("Vivasoft Limited", "Software Development", "Dhaka"),
    ("Optimizely (BD office)", "Software Development", "Dhaka"),
    ("Reve Systems", "Telecom Software", "Dhaka"),
    ("Field Buzz", "SaaS / Field Sales Tech", "Dhaka"),
    ("Sheba Platform Limited", "Services Marketplace", "Dhaka"),
    ("ShopUp", "E-commerce Enablement", "Dhaka"),
    ("Khaas Food", "AgriTech / E-commerce", "Dhaka"),
    ("iFarmer", "AgriTech", "Dhaka"),
    ("Arogga", "HealthTech", "Dhaka"),
    ("Maya Apa", "HealthTech", "Dhaka"),
    ("Truck Lagbe", "Logistics Tech", "Dhaka"),
    ("Paperfly", "Logistics", "Dhaka"),
    ("RedX Logistics", "Logistics", "Dhaka"),
    ("eCourier", "Logistics", "Dhaka"),
    ("Sindabad.com", "B2B E-commerce", "Dhaka"),
    ("Rokomari.com", "E-commerce / Books", "Dhaka"),
    ("Evaly (Legacy)", "E-commerce", "Dhaka"),
    ("Bikroy.com", "Online Marketplace", "Dhaka"),
    ("Bproperty", "PropTech", "Dhaka"),
    ("AK Khan Telecom", "Telecommunications", "Chattogram"),
    ("Summit Group", "Energy & Infrastructure", "Dhaka"),
    ("Orion Group", "Conglomerate", "Dhaka"),
    ("Akij Group", "Conglomerate", "Dhaka"),
    ("Meghna Group of Industries", "Conglomerate", "Dhaka"),
    ("Abul Khair Group", "Conglomerate", "Chattogram"),
    ("KDS Group", "Textiles & Manufacturing", "Chattogram"),
    ("Envoy Textiles", "Textiles / RMG", "Dhaka"),
    ("DBL Group", "Textiles / RMG", "Dhaka"),
    ("Ha-Meem Group", "Textiles / RMG", "Dhaka"),
    ("Epyllion Group", "Textiles / RMG", "Dhaka"),
    ("Viyellatex Group", "Textiles / RMG", "Gazipur"),
    ("Standard Group", "Textiles / RMG", "Dhaka"),
    ("Renata Limited", "Pharmaceuticals", "Dhaka"),
    ("Incepta Pharmaceuticals", "Pharmaceuticals", "Dhaka"),
    ("Eskayef Pharmaceuticals", "Pharmaceuticals", "Dhaka"),
    ("Opsonin Pharma", "Pharmaceuticals", "Dhaka"),
    ("Popular Pharmaceuticals", "Pharmaceuticals", "Dhaka"),
    ("Radiant Pharmaceuticals", "Pharmaceuticals", "Dhaka"),
    ("Delta Life Insurance", "Insurance", "Dhaka"),
    ("Pragati Insurance", "Insurance", "Dhaka"),
    ("LankaBangla Finance", "Financial Services", "Dhaka"),
    ("UCB Fintech (upay)", "Fintech", "Dhaka"),
    ("Cellbazaar", "Online Marketplace", "Dhaka"),
    ("Sheba.xyz", "Services Marketplace", "Dhaka"),
    ("10 Minute School", "EdTech", "Dhaka"),
    ("Shikho", "EdTech", "Dhaka"),
    ("Bohubrihi", "EdTech", "Dhaka"),
    ("Programming Hero", "EdTech", "Dhaka"),
    ("Khan Academy Bangla (local partner)", "EdTech", "Dhaka"),
    ("Newscred Bangladesh", "Content Technology", "Dhaka"),
    ("Portonics", "Consumer Electronics", "Dhaka"),
    ("Symphony Mobile", "Consumer Electronics", "Dhaka"),
    ("Fair Group (Fair Electronics)", "Electronics Manufacturing", "Dhaka"),
    ("Minister Hi-Tech Park", "Electronics Manufacturing", "Gazipur"),
    ("Navana Group", "Automotive & Real Estate", "Dhaka"),
    ("Rangs Group", "Automotive & Conglomerate", "Dhaka"),
    ("Aftab Automobiles", "Automotive", "Dhaka"),
    ("Runner Automobiles", "Automotive", "Dhaka"),
    ("Bashundhara Group", "Conglomerate / Real Estate", "Dhaka"),
    ("Concord Group", "Real Estate", "Dhaka"),
    ("Sheltech", "Real Estate", "Dhaka"),
    ("Building Technology & Ideas (BTI)", "Real Estate", "Dhaka"),
    ("GMG Airlines", "Aviation", "Dhaka"),
    ("US-Bangla Airlines", "Aviation", "Dhaka"),
    ("Biman Bangladesh Airlines", "Aviation", "Dhaka"),
    ("DHL Bangladesh", "Logistics", "Dhaka"),
    ("FedEx Bangladesh (agent)", "Logistics", "Dhaka"),
    ("PwC Bangladesh", "Consulting / Audit", "Dhaka"),
    ("KPMG Bangladesh", "Consulting / Audit", "Dhaka"),
    ("Deloitte Bangladesh", "Consulting / Audit", "Dhaka"),
    ("EY Bangladesh", "Consulting / Audit", "Dhaka"),
    ("A.K.M Group", "Manufacturing", "Dhaka"),
    ("Partex Group", "Conglomerate", "Dhaka"),
    ("TK Group of Industries", "Conglomerate", "Chattogram"),
    ("Confidence Group", "Cement & Infrastructure", "Chattogram"),
    ("Crown Cement (Confidence)", "Manufacturing", "Dhaka"),
    ("Fu-Wang Group", "Real Estate & Food", "Dhaka"),
    ("Index Group", "Manufacturing", "Dhaka"),
]

# ---------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------
def gen_phone():
    return "01" + str(random.choice([3,4,5,6,7,8,9])) + "".join(str(random.randint(0,9)) for _ in range(8))

def gen_name():
    gender = random.choice(["M", "F"])
    first = random.choice(MALE_FIRST if gender == "M" else FEMALE_FIRST)
    last = random.choice(LAST_NAMES)
    return f"{first} {last}", gender

def slugify_email(name, domain, idx):
    parts = name.lower().replace(".", "").split()
    base = ".".join(parts)
    return f"{base}{idx}@{domain}"

# ---------------------------------------------------------------
# Generate students (500)
# ---------------------------------------------------------------
students = []
for i in range(1, 501):
    name, gender = gen_name()
    uni = random.choices(UNIVERSITIES, weights=UNI_WEIGHTS, k=1)[0]
    dept = random.choice(DEPARTMENTS)
    batch_year = random.choice([2021, 2022, 2023, 2024])
    semester = random.choice(list(range(2, 13)))
    student_id = f"{batch_year % 100}{random.randint(1,3)}{random.randint(1000,9999)}{i:04d}"[:10]
    domain = uni.split()[0].lower().replace("(", "").replace(")", "") + ".edu.bd"
    email = slugify_email(name, domain, i)
    cgpa = round(random.uniform(2.75, 3.98), 2)
    skills = random.sample(SKILLS_POOL, k=random.randint(3, 6))
    district = random.choice(DISTRICTS)
    status = random.choices(
        ["Available", "Applied", "Interning", "Completed"],
        weights=[35, 25, 25, 15], k=1
    )[0]
    students.append({
        "student_id": student_id,
        "name": name,
        "gender": gender,
        "email": email,
        "phone": gen_phone(),
        "university": uni,
        "department": dept,
        "batch_year": batch_year,
        "semester": semester,
        "cgpa": cgpa,
        "district": district,
        "skills": skills,
        "status": status,
    })

# ---------------------------------------------------------------
# Generate teachers / faculty (55)
# ---------------------------------------------------------------
teachers = []
for i in range(1, 56):
    name, gender = gen_name()
    title = "Dr. " if random.random() < 0.6 else ""
    full_name = f"{title}{name}"
    uni = random.choices(UNIVERSITIES, weights=UNI_WEIGHTS, k=1)[0]
    dept = random.choice(DEPARTMENTS)
    designation = random.choices(DESIGNATIONS, weights=DESIG_WEIGHTS, k=1)[0]
    domain = uni.split()[0].lower().replace("(", "").replace(")", "") + ".edu.bd"
    email = slugify_email(name, domain, i)
    years_exp = random.randint(3, 24)
    degree = random.choice(DEGREES)
    research = random.sample(RESEARCH_AREAS, k=random.randint(1, 3))
    max_students = random.choice([5, 8, 10, 12, 15])
    current_students = random.randint(0, max_students)
    teachers.append({
        "faculty_id": f"FAC{i:04d}",
        "name": full_name,
        "gender": gender,
        "email": email,
        "phone": gen_phone(),
        "university": uni,
        "department": dept,
        "designation": designation,
        "years_experience": years_exp,
        "highest_degree": degree,
        "research_areas": research,
        "max_students_capacity": max_students,
        "current_assigned_students": current_students,
    })

# ---------------------------------------------------------------
# Generate companies (108 — real, well-known companies operating in Bangladesh)
# ---------------------------------------------------------------
companies = []
for i, (cname, sector, city) in enumerate(COMPANIES_REAL, start=1):
    size = random.choice(["11-50", "51-200", "201-500", "501-1000", "1000+"])
    domain = cname.lower().split("(")[0].strip().replace(" ", "").replace(".", "").replace(",", "").replace("-", "") + ".com.bd"
    email = f"careers@{domain}"
    active_postings = random.randint(0, 6)
    verified = random.random() < 0.88
    companies.append({
        "company_id": f"CMP{i:04d}",
        "name": cname,
        "sector": sector,
        "hq_city": city,
        "company_size": size,
        "contact_email": email,
        "contact_phone": gen_phone(),
        "active_postings": active_postings,
        "verified": verified,
    })

print(f"Students: {len(students)} | Teachers: {len(teachers)} | Companies: {len(companies)}")

# ---------------------------------------------------------------
# Write JSON
# ---------------------------------------------------------------
with open('/home/claude/internhub/data/students.json', 'w', encoding='utf-8') as f:
    json.dump(students, f, ensure_ascii=False, indent=2)
with open('/home/claude/internhub/data/teachers.json', 'w', encoding='utf-8') as f:
    json.dump(teachers, f, ensure_ascii=False, indent=2)
with open('/home/claude/internhub/data/companies.json', 'w', encoding='utf-8') as f:
    json.dump(companies, f, ensure_ascii=False, indent=2)

# ---------------------------------------------------------------
# Write CSV
# ---------------------------------------------------------------
def write_csv(path, rows, fields):
    with open(path, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in rows:
            row = dict(r)
            for k, v in row.items():
                if isinstance(v, list):
                    row[k] = "; ".join(v)
            w.writerow(row)

write_csv('/home/claude/internhub/data/students.csv', students, list(students[0].keys()))
write_csv('/home/claude/internhub/data/teachers.csv', teachers, list(teachers[0].keys()))
write_csv('/home/claude/internhub/data/companies.csv', companies, list(companies[0].keys()))

# ---------------------------------------------------------------
# Write SQL (matches an 11-table-style schema; simplified core tables here)
# ---------------------------------------------------------------
def esc(v):
    if v is None: return "NULL"
    if isinstance(v, bool): return "1" if v else "0"
    if isinstance(v, (int, float)): return str(v)
    if isinstance(v, list): v = "; ".join(v)
    return "'" + str(v).replace("'", "''") + "'"

sql_lines = []
sql_lines.append("-- InternHub seed data")
sql_lines.append("-- 500 students, 55 faculty, 108 companies (Bangladesh context, synthetic)\n")

sql_lines.append("""CREATE TABLE IF NOT EXISTS students (
  student_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100), gender CHAR(1), email VARCHAR(150), phone VARCHAR(15),
  university VARCHAR(150), department VARCHAR(100), batch_year INT, semester INT,
  cgpa DECIMAL(3,2), district VARCHAR(50), skills TEXT, status VARCHAR(20)
);\n""")
for s in students:
    sql_lines.append(
        "INSERT INTO students (student_id,name,gender,email,phone,university,department,batch_year,semester,cgpa,district,skills,status) VALUES ("
        f"{esc(s['student_id'])},{esc(s['name'])},{esc(s['gender'])},{esc(s['email'])},{esc(s['phone'])},"
        f"{esc(s['university'])},{esc(s['department'])},{esc(s['batch_year'])},{esc(s['semester'])},{esc(s['cgpa'])},"
        f"{esc(s['district'])},{esc(s['skills'])},{esc(s['status'])});"
    )

sql_lines.append("""\nCREATE TABLE IF NOT EXISTS faculty (
  faculty_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(100), gender CHAR(1), email VARCHAR(150), phone VARCHAR(15),
  university VARCHAR(150), department VARCHAR(100), designation VARCHAR(50),
  years_experience INT, highest_degree VARCHAR(100), research_areas TEXT,
  max_students_capacity INT, current_assigned_students INT
);\n""")
for t in teachers:
    sql_lines.append(
        "INSERT INTO faculty (faculty_id,name,gender,email,phone,university,department,designation,years_experience,highest_degree,research_areas,max_students_capacity,current_assigned_students) VALUES ("
        f"{esc(t['faculty_id'])},{esc(t['name'])},{esc(t['gender'])},{esc(t['email'])},{esc(t['phone'])},"
        f"{esc(t['university'])},{esc(t['department'])},{esc(t['designation'])},{esc(t['years_experience'])},"
        f"{esc(t['highest_degree'])},{esc(t['research_areas'])},{esc(t['max_students_capacity'])},{esc(t['current_assigned_students'])});"
    )

sql_lines.append("""\nCREATE TABLE IF NOT EXISTS companies (
  company_id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(150), sector VARCHAR(100), hq_city VARCHAR(50), company_size VARCHAR(20),
  contact_email VARCHAR(150), contact_phone VARCHAR(15), active_postings INT, verified BOOLEAN
);\n""")
for c in companies:
    sql_lines.append(
        "INSERT INTO companies (company_id,name,sector,hq_city,company_size,contact_email,contact_phone,active_postings,verified) VALUES ("
        f"{esc(c['company_id'])},{esc(c['name'])},{esc(c['sector'])},{esc(c['hq_city'])},{esc(c['company_size'])},"
        f"{esc(c['contact_email'])},{esc(c['contact_phone'])},{esc(c['active_postings'])},{esc(c['verified'])});"
    )

with open('/home/claude/internhub/data/seed_data.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_lines))

print("Wrote JSON, CSV, and SQL files to /home/claude/internhub/data/")
