import type { ResumeData, StyleSettings } from "@shared/schema";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

interface TemplateProps {
  data: ResumeData;
  style: StyleSettings;
}

export default function TemplateTen({ data, style }: TemplateProps) {
  const colors = style.colors || {};
  
  return (
    <div
      className="resume-template flex h-full"
      style={{
        fontSize: `${style.bodyFontSize}px`,
        lineHeight: style.lineHeight,
        padding: `${style.marginTop}px ${style.marginRight}px ${style.marginBottom}px ${style.marginLeft}px`,
        backgroundColor: colors.background || "#f8f9fa",
        color: colors.bodyTextColor || "#333333",
      }}
    >
      {/* Left Sidebar */}
      <aside
        className="p-6 flex flex-col"
        style={{ 
          width: `${style.sidebarWidth}%`,
          backgroundColor: colors.sidebarBackground || "#f1f3f4",
          color: colors.sidebarTextColor || "#333333",
        }}
      >
        {/* Profile Photo */}
        <div className="w-40 h-40 rounded-full overflow-hidden mb-6 mx-auto border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name and Title */}
        <div className="text-center mb-8">
          <h1
            className="font-bold mb-2"
            style={{ 
              fontSize: `${style.headerFontSize * 1.8}px`,
              color: colors.primary || "#8B4513",
            }}
          >
            {data.name}
          </h1>
          <h2
            className="font-medium"
            style={{ 
              fontSize: `${style.headerFontSize * 0.9}px`,
              color: colors.secondary || "#666666",
            }}
          >
            {data.title}
          </h2>
        </div>

        {/* About Me */}
        {data.summary && (
          <div className="mb-8">
            <h3 
              className="text-base font-bold mb-4 pb-2"
              style={{ 
                borderBottom: `2px solid ${colors.primary || "#8B4513"}`,
                color: colors.headerTextColor || "#333333",
              }}
            >
              About Me
            </h3>
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <div className="space-y-3 text-sm">
            {data.contact.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3" style={{ color: colors.primary || "#8B4513" }} />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3" style={{ color: colors.primary || "#8B4513" }} />
                <span className="break-all">{data.contact.email}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-3" style={{ color: colors.primary || "#8B4513" }} />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-3" style={{ color: colors.primary || "#8B4513" }} />
                <span className="break-all">{data.contact.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 
              className="text-base font-bold mb-4 pb-2"
              style={{ 
                borderBottom: `2px solid ${colors.primary || "#8B4513"}`,
                color: colors.headerTextColor || "#333333",
              }}
            >
              Skills
            </h3>
            <ul className="space-y-2">
              {data.skills.map((skill, i) => (
                <li key={i} className="text-sm flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary || "#8B4513" }}></span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h3 
              className="text-base font-bold mb-4 pb-2"
              style={{ 
                borderBottom: `2px solid ${colors.primary || "#8B4513"}`,
                color: colors.headerTextColor || "#333333",
              }}
            >
              Language
            </h3>
            <ul className="space-y-2">
              {data.languages.map((lang, i) => (
                <li key={i} className="text-sm flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: colors.primary || "#8B4513" }}></span>
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main
        className="flex-1 p-8"
        style={{ 
          width: `${100 - style.sidebarWidth}%`,
          color: colors.bodyTextColor || "#333333",
        }}
      >
        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 
              className="text-xl font-bold mb-6"
              style={{ 
                color: colors.headerTextColor || "#333333",
              }}
            >
              Education
            </h3>
            <div className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-base font-semibold">{edu.institution}</h4>
                      <p className="text-sm font-medium" style={{ color: colors.primary || "#8B4513" }}>{edu.degree}</p>
                    </div>
                    <span className="text-sm text-gray-500">{edu.from} - {edu.to}</span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8" style={{ marginBottom: `${style.sectionSpacing}px` }}>
            <h3 
              className="text-xl font-bold mb-6"
              style={{ 
                color: colors.headerTextColor || "#333333",
              }}
            >
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-base font-semibold">{exp.company}</h4>
                      <p className="text-sm font-medium" style={{ color: colors.primary || "#8B4513" }}>{exp.position}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.from} - {exp.to}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-2">{exp.description}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {exp.highlights.map((highlight, j) => (
                        <li key={j} className="flex items-start">
                          <span className="w-1 h-1 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.accent || "#06b6d4" }}></span>
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

        {/* References */}
        {data.references && data.references.length > 0 && (
          <section>
            <h3 
              className="text-xl font-bold mb-6"
              style={{ 
                color: colors.headerTextColor || "#333333",
              }}
            >
              References
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {data.references.map((ref, i) => (
                <div key={i}>
                  <h4 className="text-base font-semibold">{ref.name}</h4>
                  <p className="text-sm text-gray-600">{ref.position}</p>
                  {ref.company && <p className="text-sm text-gray-600">{ref.company}</p>}
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
  );
}