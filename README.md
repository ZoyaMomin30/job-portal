# to setup with supabase

-create supabase tables by running the queries 
-create lib/supabase/client.ts : creates supabase client. This is Supabase’s official client for browser-side usage

## supabase import 
```
import { createClient } from "@/lib/supabase/server"
const supabase = await createClient()
```
to insert 
```
const { error } = await supabase
  .from('countries')
  .insert({ id: 1, name: 'Mordor' })
```

🎯 Interview gold (remember this line)

You can now confidently say:

“I built a backend pipeline that accepts resumes, stores originals in object storage, extracts text server-side, and prepares it for AI-based structured parsing.”

database relationship
```
users 1 ──── * jobs
users 1 ──── * applications
jobs  1 ──── * applications
```
This allows:
View all jobs
View all applications per job
View all applications by a user


This project is not a job marketplace focused on mass applications.
It is a structured hiring platform designed to help recruiters make faster and better hiring decisions.

Key Differences

Quality over quantity: Candidates are ranked based on role-fit instead of resume volume.
Explainable ATS scoring: Users can see why a resume matches or doesn’t.
AI semantic matching: Matches skills by meaning, not just keywords.
Recruiter-first dashboards: Clean pipelines, ranked candidates, and clear screening stages.
Transparent candidate feedback: Highlights missing skills and improvement areas.

Why It Matters

Platforms like Naukri optimize for scale.
This project optimizes for signal quality, clarity, and hiring efficiency.

AI 
🤖 How AI Is Used in This Project

AI Resume Parsing – Extracts skills, experience, education, and tools from resumes.
Semantic Skill Matching – Matches resumes to jobs based on meaning, not just keywords.
ATS Score Calculation – Generates a weighted match score between candidate and job role.
Skill Gap Analysis – Identifies missing or weak skills for each job application.
Candidate Ranking – Automatically ranks applicants by relevance for recruiters.
Resume Improvement Suggestions – Suggests skills or keywords to improve ATS score.
Duplicate / Low-Quality Application Detection – Flags spam or irrelevant applications.
Recruiter Insights – Highlights top-fit candidates and key strengths at a glance.

What it does:
User uploads resume (PDF)
User pastes job description
Model scores match percentage
Highlights missing skills
Suggests resume improvements

if the project is scaled on a large basis i can be used as a B2B SaaS system : B2B SaaS means Business-to-Business Software as a Service: cloud-based software sold by one company to another (not individual consumers) on a subscription basis (monthly/yearly), eliminating the need for on-premise installation, with the vendor handling hosting, updates, and security for tools used in sales, marketing, HR, or operations

## 🤖 AI Integration in the Job Portal

This project incorporates Artificial Intelligence to enhance the hiring and job application process by automating resume screening, improving matching accuracy, and assisting both recruiters and job seekers with data-driven insights.

---

### 1. AI Resume–Job Matching (Core Feature)
- Uses Natural Language Processing (NLP) to compare resume content with job descriptions.
- Generates a **match percentage score** indicating how well a candidate fits a role.
- Helps recruiters quickly shortlist the most relevant candidates.

**Techniques used:**  
TF-IDF / BERT embeddings, Cosine Similarity

---

### 2. ATS Compatibility Scoring
- Simulates Applicant Tracking System (ATS) behavior.
- Evaluates resumes based on keyword relevance and required skills.
- Highlights missing or underrepresented skills in a candidate’s resume.

**Benefit:**  
Improves the chances of resumes passing automated screening systems.

---

### 3. Skill Extraction from Resumes
- Automatically extracts key skills, tools, and technologies from uploaded resumes.
- Converts unstructured resume text into structured, searchable data.

**Techniques used:**  
Keyword extraction, Named Entity Recognition (NER)

---

### 4. AI-Based Applicant Ranking
- Automatically ranks applicants for each job posting based on AI match scores.
- Recruiters see high-relevance candidates first, reducing manual effort.

**Benefit:**  
Faster and more efficient hiring decisions.

---

### 5. Personalized Job Recommendations (Optional Enhancement)
- Recommends jobs to job seekers based on resume content and past applications.
- Improves job discovery and user engagement.

**Technique used:**  
Content-based recommendation system

---

### 6. Resume Improvement Suggestions
- Provides AI-driven feedback on resumes.
- Suggests missing skills and better keyword usage aligned with job descriptions.

**Benefit:**  
Helps candidates improve resume quality and job fit.

---

### 7. Duplicate and Low-Quality Resume Detection (Optional)
- Detects duplicate resumes or low-relevance applications.
- Reduces spam and improves data quality for recruiters.

---

### 8. AI-Driven Hiring Analytics (Optional)
- Aggregates AI insights such as:
  - Average match score per job
  - Most in-demand skills across job postings
- Useful for recruiters and platform administrators.

---

### Summary
By integrating AI at multiple stages of the hiring workflow, this platform moves beyond a traditional job portal to provide intelligent screening, ranking, and recommendation capabilities, making the hiring process faster, smarter, and more effective.

## overall pipeline 
## 🧠 Machine Learning Pipeline (AI Resume Matching)

This project uses a structured Machine Learning pipeline to evaluate how well a candidate’s resume matches a job description. The pipeline follows real-world NLP system design principles.

---

### 1. Data Ingestion
**Inputs:**
- Resume (PDF uploaded by job seeker)
- Job description (text entered by recruiter)

**Process:**
- Resume is uploaded via frontend and stored in Supabase Storage
- Backend retrieves resume file and sends it to the AI service
- Job description text is passed directly to the AI service

---

### 2. Text Extraction
- Resume PDF is converted into raw text
- Non-informative sections (headers, footers, extra spaces) are cleaned

**Tools:**
- PyMuPDF / pdfplumber

**Output:**
- Clean resume text
- Clean job description text

---

### 3. Text Preprocessing
Both resume and job description undergo NLP preprocessing:

- Lowercasing
- Removal of punctuation and special characters
- Stopword removal
- Lemmatization

**Libraries:**
- NLTK / spaCy

**Purpose:**
- Reduce noise
- Normalize text for accurate comparison

---

### 4. Skill & Keyword Extraction
- Extracts important skills, tools, and technologies
- Identifies overlapping skills between resume and job description

**Techniques:**
- Keyword frequency analysis
- Named Entity Recognition (NER) (optional enhancement)

**Output:**
- List of matched skills
- List of missing skills

---

### 5. Text Vectorization
Converts text into numerical form for similarity calculation.

**Approach (Phase 1):**
- TF-IDF Vectorization

**Upgrade Path (Phase 2):**
- BERT / Sentence Transformers for semantic embeddings

**Output:**
- Numerical vectors for resume and job description

---

### 6. Similarity Computation
- Computes similarity between resume and job description vectors
- Uses cosine similarity to measure closeness

**Formula Used:**
- Cosine Similarity

**Output:**
- Similarity score between 0 and 1

---

### 7. Match Score Normalization
- Similarity score is converted into a percentage


