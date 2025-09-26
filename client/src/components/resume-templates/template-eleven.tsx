import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateEleven({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: 0,
        backgroundColor: colors.background || "#ffffff",
        color: colors.bodyTextColor || "#333333",
      }}
    >
      {/* Header */}
      <header 
        className="p-8 text-white relative"
        style={{ 
          backgroundColor: colors.sidebarBackground || "#2c3e50",
          color: colors.sidebarTextColor || "#ffffff",
        }}
      >
        <div className="flex items-center">
          {/* Profile Photo */}
          <div className="w-32 h-32 rounded-full overflow-hidden mr-8 border-4 border-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612c38f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Name and Title */}
          <div className="flex-1">
            <h1
              className="font-bold uppercase tracking-wide mb-2"
              style={{ 
                fontSize: `${style.headerFontSize * 2}px`,
              }}
            >
              {data.name}
            </h1>
            <h2
              className="font-medium uppercase tracking-wide"
              style={{ 
                fontSize: `${style.headerFontSize * 0.8}px`,
                opacity: 0.9,
              }}
            >
              {data.title}
            </h2>
          </div>

          {/* Contact Info */}
          <div className="text-right space-y-2 text-sm">
            {data.contact.phone && (
              <div className="flex items-center justify-end">
                <span className="mr-2">{data.contact.phone}</span>
                <Phone className="w-4 h-4" />
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center justify-end">
                <span className="mr-2 break-all">{data.contact.email}</span>
                <Mail className="w-4 h-4" />
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center justify-end">
                <span className="mr-2">{data.contact.location}</span>
                <MapPin className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex" style={{ height: 'calc(100% - 200px)' }}>
        {/* Left Sidebar */}
        <aside
          className="p-6"
          style={{ 
            width: `${style.sidebarWidth}%`,
            backgroundColor: colors.background || "#ffffff",
            color: colors.bodyTextColor || "#333333",
          }}
        >
          {/* About Me */}
          {data.summary && (
            <div className="mb-8">
              <h3 
                className="text-base font-bold mb-4"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                About Me
              </h3>
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-base font-bold mb-4"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Skills
              </h3>
              <ul className="space-y-2">
                {data.skills.map((skill, i) => (
                  <li key={i} className="text-sm flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary || "#3498db" }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Expertise */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-base font-bold mb-4"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Expertise
              </h3>
              <div className="space-y-3">
                {data.skills.slice(0, 5).map((skill, i) => (
                  <div key={i} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span>{skill}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: '85%',
                          backgroundColor: colors.primary || "#3498db",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="mb-8">
              <h3 
                className="text-base font-bold mb-4"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Languages
              </h3>
              <ul className="space-y-2">
                {data.languages.map((lang, i) => (
                  <li key={i} className="text-sm">
                    <div className="flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">({lang.level})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div>
              <h3 
                className="text-base font-bold mb-4"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Certifications
              </h3>
              <div className="space-y-3">
                {data.certifications.map((cert, i) => (
                  <div key={i} className="text-sm">
                    <h4 className="font-medium">{cert.title}</h4>
                    <p className="text-gray-600">{cert.issuer}</p>
                    <p className="text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main
          className="flex-1 p-6"
          style={{ 
            width: `${100 - style.sidebarWidth}%`,
            color: colors.bodyTextColor || "#333333",
          }}
        >
          {/* Work Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
              <h3 
                className="text-xl font-bold mb-6"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Work Experience
              </h3>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base font-semibold">{exp.position}</h4>
                          <p className="text-sm font-medium" style={{ color: colors.primary || "#3498db" }}>{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{exp.from} - {exp.to}</span>
                          <p className="text-xs text-gray-400">3 years</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed mb-2">{exp.description}</p>
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {exp.highlights.map((highlight, j) => (
                          <li key={j} className="flex items-start">
                            <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.accent || "#e74c3c" }}></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
              <h3 
                className="text-xl font-bold mb-6"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="text-base font-semibold">{edu.degree}</h4>
                        <p className="text-sm text-gray-600">{edu.institution}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{edu.from} - {edu.to}</span>
                        <p className="text-xs text-gray-400">4 years</p>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references && data.references.length > 0 && (
            <section>
              <h3 
                className="text-xl font-bold mb-6"
                style={{ 
                  color: colors.headerTextColor || "#2c3e50",
                }}
              >
                Reference
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {data.references.map((ref, i) => (
                  <div key={i}>
                    <h4 className="text-base font-semibold">{ref.name}</h4>
                    <p className="text-sm text-gray-600">{ref.position}, {ref.company}</p>
                    <div className="mt-2 space-y-1 text-sm">
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
    </div>
  );
}