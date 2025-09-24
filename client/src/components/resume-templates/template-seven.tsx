import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, User, GraduationCap, Briefcase, Cog, Users } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateSeven({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#f8fafc",
      }}
    >
      {/* Sidebar */}
      <aside
        className="p-6 flex flex-col"
        style={{ 
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#f1f5f9",
          color: colors.sidebarTextColor || "#475569",
        }}
      >
        {/* Photo */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="text-center mb-6">
          <h1
            className="font-bold mb-2"
            style={{ 
              fontSize: `${style.headerFontSize}px`,
              color: colors.primary || "#3b82f6",
            }}
          >
            {data.name}
          </h1>
          <h2
            className="font-medium"
            style={{ 
              fontSize: `${style.headerFontSize * 0.8}px`,
              color: colors.headerTextColor || "#64748b",
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4 flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Contact
          </h3>
          <div className="space-y-3 text-xs">
            {data.contact.phone && (
              <div className="flex items-center">
                <Phone className="w-3 h-3 mr-2" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                <span className="break-all">{data.contact.email}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center">
                <MapPin className="w-3 h-3 mr-2" />
                <span>{data.contact.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* About Me */}
        {data.summary && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" />
              About Me
            </h3>
            <p className="text-xs leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <Cog className="w-4 h-4 mr-2" />
              Skills
            </h3>
            <div className="space-y-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="text-xs">
                  <span className="block">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8"
        style={{ 
          width: `${100 - style.sidebarWidth}%`,
          color: colors.bodyTextColor || "#374151",
        }}
      >
        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <GraduationCap className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-sm font-semibold">{edu.degree}</h4>
                        <p className="text-xs text-gray-600">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500">{edu.from} - {edu.to}</span>
                    </div>
                    {edu.description && (
                      <p className="text-xs text-gray-700 leading-relaxed mt-1">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <Briefcase className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="flex items-start">
                  <div className="w-3 h-3 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: colors.primary || "#3b82f6" }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-semibold">{exp.position}</h4>
                        <p className="text-xs font-medium" style={{ color: colors.primary || "#3b82f6" }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">{exp.from} - {exp.to}</span>
                    </div>
                    <p className="text-xs leading-relaxed mb-2">{exp.description}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="text-xs space-y-1">
                        {exp.highlights.map((highlight, j) => (
                          <li key={j} className="flex items-start">
                            <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.accent || "#06b6d4" }}></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 className="text-base font-bold mb-4 flex items-center border-b pb-2" style={{ borderColor: colors.primary || "#3b82f6" }}>
              <Users className="w-5 h-5 mr-2" style={{ color: colors.primary || "#3b82f6" }} />
              References
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {data.references.map((ref, i) => (
                <div key={i} className="text-xs">
                  <h4 className="font-semibold">{ref.name}</h4>
                  <p className="text-gray-600">{ref.position}</p>
                  {ref.company && <p className="text-gray-600">{ref.company}</p>}
                  <div className="mt-2 space-y-1">
                    {ref.phone && <p><strong>Phone:</strong> {ref.phone}</p>}
                    {ref.email && <p><strong>Email:</strong> {ref.email}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}