import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Languages } from "lucide-react";
import type { ResumeData, LanguageItem } from "@shared/schema";

interface LanguagesSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function LanguagesSection({ data, onDataChange }: LanguagesSectionProps) {
  const languages = data.languages || [];

  const addLanguage = () => {
    const newLanguage: LanguageItem = {
      name: "",
      level: "Beginner",
    };
    
    onDataChange({
      languages: [...languages, newLanguage],
    });
  };

  const updateLanguage = (index: number, field: keyof LanguageItem, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    onDataChange({ languages: updatedLanguages });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    onDataChange({ languages: updatedLanguages });
  };

  const proficiencyLevels = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper Intermediate", 
    "Advanced",
    "Proficient",
    "Native",
    "Fluent",
    "Conversational"
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Languages className="w-5 h-5 mr-2 text-primary" />
          <h4 className="font-medium text-foreground">Languages</h4>
        </div>
        <Button
          onClick={addLanguage}
          size="sm"
          className="px-3 py-1"
          data-testid="button-add-language"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {languages.length === 0 ? (
        <p className="text-sm text-muted-foreground">No languages added yet.</p>
      ) : (
        <div className="space-y-4">
          {languages.map((language, index) => (
            <div key={index} className="p-4 border border-border rounded-lg" data-testid={`language-form-${index}`}>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Language
                  </Label>
                  <Input
                    value={language.name}
                    onChange={(e) => updateLanguage(index, "name", e.target.value)}
                    placeholder="e.g. Spanish, French, Mandarin"
                    data-testid={`input-language-name-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Proficiency Level
                  </Label>
                  <Select
                    value={language.level}
                    onValueChange={(value) => updateLanguage(index, "level", value)}
                  >
                    <SelectTrigger data-testid={`select-language-level-${index}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeLanguage(index)}
                className="mt-3 text-destructive hover:text-destructive/80"
                data-testid={`button-remove-language-${index}`}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}