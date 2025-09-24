import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Users } from "lucide-react";
import type { ResumeData, ReferenceItem } from "@shared/schema";

interface ReferencesSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function ReferencesSection({ data, onDataChange }: ReferencesSectionProps) {
  const references = data.references || [];

  const addReference = () => {
    const newReference: ReferenceItem = {
      name: "",
      position: "",
      company: "",
      phone: "",
      email: "",
    };
    
    onDataChange({
      references: [...references, newReference],
    });
  };

  const updateReference = (index: number, field: keyof ReferenceItem, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value,
    };
    onDataChange({ references: updatedReferences });
  };

  const removeReference = (index: number) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    onDataChange({ references: updatedReferences });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary" />
          <h4 className="font-medium text-foreground">References</h4>
        </div>
        <Button
          onClick={addReference}
          size="sm"
          className="px-3 py-1"
          data-testid="button-add-reference"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add
        </Button>
      </div>
      
      {references.length === 0 ? (
        <p className="text-sm text-muted-foreground">No references added yet.</p>
      ) : (
        <div className="space-y-4">
          {references.map((ref, index) => (
            <div key={index} className="p-4 border border-border rounded-lg" data-testid={`reference-form-${index}`}>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Full Name
                  </Label>
                  <Input
                    value={ref.name}
                    onChange={(e) => updateReference(index, "name", e.target.value)}
                    placeholder="e.g. John Smith"
                    data-testid={`input-ref-name-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Position/Title
                  </Label>
                  <Input
                    value={ref.position}
                    onChange={(e) => updateReference(index, "position", e.target.value)}
                    placeholder="e.g. Senior Manager"
                    data-testid={`input-ref-position-${index}`}
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-foreground mb-1 block">
                    Company (Optional)
                  </Label>
                  <Input
                    value={ref.company || ""}
                    onChange={(e) => updateReference(index, "company", e.target.value)}
                    placeholder="e.g. ABC Corporation"
                    data-testid={`input-ref-company-${index}`}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1 block">
                      Phone
                    </Label>
                    <Input
                      value={ref.phone || ""}
                      onChange={(e) => updateReference(index, "phone", e.target.value)}
                      placeholder="123-456-7890"
                      data-testid={`input-ref-phone-${index}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1 block">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={ref.email || ""}
                      onChange={(e) => updateReference(index, "email", e.target.value)}
                      placeholder="john@example.com"
                      data-testid={`input-ref-email-${index}`}
                    />
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeReference(index)}
                className="mt-3 text-destructive hover:text-destructive/80"
                data-testid={`button-remove-reference-${index}`}
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