import { type Resume, type InsertResume, type ResumeData, type StyleSettings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getResume(id: string): Promise<Resume | undefined>;
  getResumesByUser(userId: string): Promise<Resume[]>;
  createResume(resume: InsertResume): Promise<Resume>;
  updateResume(id: string, updates: Partial<InsertResume>): Promise<Resume | undefined>;
  deleteResume(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private resumes: Map<string, Resume>;

  constructor() {
    this.resumes = new Map();
  }

  async getResume(id: string): Promise<Resume | undefined> {
    return this.resumes.get(id);
  }

  async getResumesByUser(userId: string): Promise<Resume[]> {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId,
    );
  }

  async createResume(insertResume: InsertResume): Promise<Resume> {
  const id = randomUUID();

  const sampleData: Resume["data"] = {
    name: "Jane Doe",
    title: "Full Stack Developer",
    summary:
      "Experienced software developer with a strong background in building scalable web applications and APIs.",
    contact: {
      email: "jane.doe@example.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://www.linkedin.com/in/janedoe",
      location: "New York, NY",
    },
    experience: [
      {
        company: "TechCorp Inc.",
        position: "Senior Software Engineer",
        from: "Jan 2020",
        to: "Present",
        description:
          "Led the development of a microservices architecture serving 1M+ monthly users.",
      },
      {
        company: "StartupX",
        position: "Frontend Developer",
        from: "Jun 2017",
        to: "Dec 2019",
        description:
          "Built and maintained a React-based SPA. Improved performance by 30%.",
      },
    ],
    education: [
      {
        institute: "State University",
        degree: "B.Sc. in Computer Science",
        from: "2013",
        to: "2017",
        description: "Graduated with honors, specializing in software engineering.",
      },
    ],
    skills: ["JavaScript", "TypeScript", "Node.js", "React", "Express", "SQL", "Docker"],
  };

  // Merge incoming data with defaults
  const data = {
    ...sampleData,
    //...(insertResume.data || {}),
  };

  const style = {
    headerFontSize: 18,
    bodyFontSize: 12,
    sectionSpacing: 16,
    lineHeight: 1.5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    sidebarWidth: 40,
    ...(insertResume.style || {}),
  };

  const resume: Resume = { ...insertResume, id, data, style };

  this.resumes.set(id, resume);
  return resume;
}



  async updateResume(id: string, updates: Partial<InsertResume>): Promise<Resume | undefined> {
    const existingResume = this.resumes.get(id);
    if (!existingResume) {
      return undefined;
    }

    const updatedResume: Resume = {
      ...existingResume,
      ...updates,
    };
    this.resumes.set(id, updatedResume);
    return updatedResume;
  }

  async deleteResume(id: string): Promise<boolean> {
    return this.resumes.delete(id);
  }
}

export const storage = new MemStorage();
