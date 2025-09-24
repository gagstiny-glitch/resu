import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Save, Download } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Resume, ResumeData, StyleSettings } from "@shared/schema";

// Import template components
import TemplateOne from "@/components/resume-templates/template-one";
import TemplateTwo from "@/components/resume-templates/template-two";
import TemplateThree from "@/components/resume-templates/template-three";
import TemplateFour from "@/components/resume-templates/template-four";
import TemplateFive from "@/components/resume-templates/template-five";
import TemplateSix from "@/components/resume-templates/template-six";
import TemplateSeven from "@/components/resume-templates/template-seven";
import TemplateEight from "@/components/resume-templates/template-eight";
import TemplateNine from "@/components/resume-templates/template-nine";

// Import sidebar sections
import BioSection from "@/components/sidebar/bio-section";
import ContactSection from "@/components/sidebar/contact-section";
import ExperienceSection from "@/components/sidebar/experience-section";
import EducationSection from "@/components/sidebar/education-section";
import SkillsSection from "@/components/sidebar/skills-section";
import LanguagesSection from "@/components/sidebar/languages-section";
import CertificationsSection from "@/components/sidebar/certifications-section";
import ReferencesSection from "@/components/sidebar/references-section";
import StyleSection from "@/components/sidebar/style-section";

type SectionType = "bio" | "contact" | "experience" | "education" | "skills" | "languages" | "certifications" | "references" | "customize";

export default function ResumeBuilder() {
  const [match, params] = useRoute("/builder/:id?");
  const [activeSection, setActiveSection] = useState<SectionType>("bio");
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    title: "",
    summary: "",
    contact: { email: "", phone: "", linkedin: "", location: "" },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    references: [],
  });
  const [styleSettings, setStyleSettings] = useState<StyleSettings>({
    headerFontSize: 18,
    bodyFontSize: 12,
    sectionSpacing: 16,
    lineHeight: 1.5,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    sidebarWidth: 40,
    colors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#06b6d4",
      background: "#ffffff",
      sidebarBackground: "#1e293b",
      headerTextColor: "#1e293b",
      bodyTextColor: "#374151",
      sidebarTextColor: "#ffffff",
    },
  });
  const [templateId, setTemplateId] = useState("1");
  const { toast } = useToast();

  const resumeId = params?.id;

  // Fetch existing resume if ID provided
  const { data: resume, isLoading } = useQuery<Resume>({
    queryKey: ["/api/resumes", resumeId],
    enabled: !!resumeId,
  });

  // Update mutation
  const updateResumeMutation = useMutation({
    mutationFn: async (updates: Partial<Resume>) => {
      if (!resumeId) throw new Error("No resume ID");
      const response = await apiRequest("PATCH", `/api/resumes/${resumeId}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes", resumeId] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes.",
      });
    },
  });

  // Create mutation for new resumes
  const createResumeMutation = useMutation({
    mutationFn: async (newResume: any) => {
      const response = await apiRequest("POST", "/api/resumes", newResume);
      return response.json();
    },
    onSuccess: (newResume) => {
      window.history.replaceState({}, "", `/builder/${newResume.id}`);
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
    },
  });

  // Load resume data when query succeeds
  useEffect(() => {
    if (resume && resume.data && resume.style && resume.templateId) {
      setResumeData(resume.data);
      setStyleSettings(resume.style);
      setTemplateId(resume.templateId);
    }
  }, [resume]);

  // Auto-save functionality
  useEffect(() => {
    if (!resumeId || isLoading) return;

    const timeoutId = setTimeout(() => {
      updateResumeMutation.mutate({
        data: resumeData,
        style: styleSettings,
        templateId,
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [resumeData, styleSettings, templateId, resumeId, isLoading]);

  // Create new resume if no ID provided
  useEffect(() => {
    if (!resumeId && !isLoading) {
      createResumeMutation.mutate({
        name: "Untitled Resume",
        templateId: "1",
        userId: "anonymous",
        data: resumeData,
        style: styleSettings,
      });
    }
  }, []);

  const handleDataChange = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const handleStyleChange = (newStyle: Partial<StyleSettings>) => {
    setStyleSettings(prev => ({ ...prev, ...newStyle }));
  };

  const handleTemplateChange = (newTemplateId: string) => {
    setTemplateId(newTemplateId);
  };

  const renderTemplate = () => {
    const props = { data: resumeData, style: styleSettings };
    
    switch (templateId) {
      case "1":
        return <TemplateOne {...props} />;
      case "2":
        return <TemplateTwo {...props} />;
      case "3":
        return <TemplateThree {...props} />;
      case "4":
        return <TemplateFour {...props} />;
      case "5":
        return <TemplateFive {...props} />;
      case "6":
        return <TemplateSix {...props} />;
      case "7":
        return <TemplateSeven {...props} />;
      case "8":
        return <TemplateEight {...props} />;
      case "9":
        return <TemplateNine {...props} />;
      default:
        return <TemplateOne {...props} />;
    }
  };

  const renderSectionEditor = () => {
    const commonProps = { data: resumeData, onDataChange: handleDataChange };
    
    switch (activeSection) {
      case "bio":
        return <BioSection {...commonProps} />;
      case "contact":
        return <ContactSection {...commonProps} />;
      case "experience":
        return <ExperienceSection {...commonProps} />;
      case "education":
        return <EducationSection {...commonProps} />;
      case "skills":
        return <SkillsSection {...commonProps} />;
      case "languages":
        return <LanguagesSection {...commonProps} />;
      case "certifications":
        return <CertificationsSection {...commonProps} />;
      case "references":
        return <ReferencesSection {...commonProps} />;
      case "customize":
        return <StyleSection style={styleSettings} onStyleChange={handleStyleChange} />;
      default:
        return <BioSection {...commonProps} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="text-primary-foreground text-lg" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">ResumeForge</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-autosave"
            >
              <Save className="mr-2 h-4 w-4" />
              {updateResumeMutation.isPending ? "Saving..." : "Auto-saved"}
            </Button>
            <Button size="sm" data-testid="button-download">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
        {/* Left Sidebar - Section Editors */}
        <div className="w-full lg:w-80 bg-card border-b lg:border-b-0 lg:border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resume Editor</h3>
            
            {/* Template Switcher */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">Template</label>
              <Select value={templateId} onValueChange={handleTemplateChange}>
                <SelectTrigger data-testid="select-template">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Professional Dark</SelectItem>
                  <SelectItem value="2">Modern Clean</SelectItem>
                  <SelectItem value="3">Executive</SelectItem>
                  <SelectItem value="4">Corporate</SelectItem>
                  <SelectItem value="5">Mariana Anderson</SelectItem>
                  <SelectItem value="6">Francisco Andrade</SelectItem>
                  <SelectItem value="7">Lorna Alvarado</SelectItem>
                  <SelectItem value="8">Richard Sanchez</SelectItem>
                  <SelectItem value="9">Olivia Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Section Tabs */}
            <div className="flex flex-wrap gap-1">
              {[
                { key: "bio" as const, label: "Bio" },
                { key: "contact" as const, label: "Contact" },
                { key: "experience" as const, label: "Experience" },
                { key: "education" as const, label: "Education" },
                { key: "skills" as const, label: "Skills" },
                { key: "languages" as const, label: "Languages" },
                { key: "certifications" as const, label: "Certs" },
                { key: "references" as const, label: "References" },
                { key: "customize" as const, label: "Style" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    activeSection === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  data-testid={`tab-${key}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {renderSectionEditor()}
          </div>
        </div>

        {/* Main Content Area - Live Preview */}
        <div className="flex-1 bg-muted overflow-auto">
          <div className="p-4 lg:p-8 flex justify-center">
            <div className="a4-preview bg-card">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
