import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import type { StyleSettings } from "@shared/schema";

interface ColorSectionProps {
  style: StyleSettings;
  onStyleChange: (style: Partial<StyleSettings>) => void;
}

export default function ColorSection({ style, onStyleChange }: ColorSectionProps) {
  const colors = style.colors || {};

  const updateColor = (colorKey: string, value: string) => {
    onStyleChange({
      colors: {
        ...colors,
        [colorKey]: value,
      },
    });
  };

  const colorOptions = [
    { key: "primary", label: "Primary Color", description: "Main accent color" },
    { key: "secondary", label: "Secondary Color", description: "Secondary accent" },
    { key: "accent", label: "Accent Color", description: "Highlight color" },
    { key: "background", label: "Background", description: "Main background" },
    { key: "sidebarBackground", label: "Sidebar Background", description: "Sidebar color" },
    { key: "headerTextColor", label: "Header Text", description: "Header text color" },
    { key: "bodyTextColor", label: "Body Text", description: "Main text color" },
    { key: "sidebarTextColor", label: "Sidebar Text", description: "Sidebar text color" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Palette className="w-5 h-5 mr-2 text-primary" />
        <h4 className="font-medium text-foreground">Color Settings</h4>
      </div>
      
      <div className="space-y-4">
        {colorOptions.map(({ key, label, description }) => (
          <div key={key}>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              {label}
            </Label>
            <p className="text-xs text-muted-foreground mb-2">{description}</p>
            <div className="flex items-center space-x-3">
              <Input
                type="color"
                value={colors[key as keyof typeof colors] || "#000000"}
                onChange={(e) => updateColor(key, e.target.value)}
                className="w-16 h-10 p-1 border rounded cursor-pointer"
                data-testid={`color-${key}`}
              />
              <Input
                type="text"
                value={colors[key as keyof typeof colors] || "#000000"}
                onChange={(e) => updateColor(key, e.target.value)}
                placeholder="#000000"
                className="flex-1 text-sm font-mono"
                data-testid={`color-input-${key}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h5 className="text-sm font-medium mb-2">Quick Presets</h5>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#3b82f6",
                secondary: "#64748b",
                accent: "#06b6d4",
                background: "#ffffff",
                sidebarBackground: "#1e293b",
                headerTextColor: "#1e293b",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Blue Professional
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#059669",
                secondary: "#64748b",
                accent: "#10b981",
                background: "#ffffff",
                sidebarBackground: "#065f46",
                headerTextColor: "#065f46",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Green Modern
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#dc2626",
                secondary: "#64748b",
                accent: "#ef4444",
                background: "#ffffff",
                sidebarBackground: "#7f1d1d",
                headerTextColor: "#7f1d1d",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Red Bold
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#7c3aed",
                secondary: "#64748b",
                accent: "#8b5cf6",
                background: "#ffffff",
                sidebarBackground: "#581c87",
                headerTextColor: "#581c87",
                bodyTextColor: "#374151",
                sidebarTextColor: "#ffffff",
              }
            })}
            className="p-2 text-xs bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Purple Creative
          </button>
        </div>
      </div>
    </div>
  );
}