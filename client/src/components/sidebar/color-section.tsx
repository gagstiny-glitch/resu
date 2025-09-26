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
        <div className="grid grid-cols-2 gap-2 mb-4">
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
        
        <h6 className="text-xs font-medium mb-2 text-muted-foreground">Light Themes</h6>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#f59e0b",
                secondary: "#d1d5db",
                accent: "#fbbf24",
                background: "#fefce8",
                sidebarBackground: "#fef3c7",
                headerTextColor: "#92400e",
                bodyTextColor: "#451a03",
                sidebarTextColor: "#92400e",
              }
            })}
            className="p-2 text-xs bg-yellow-400 text-yellow-900 rounded hover:bg-yellow-500"
          >
            Warm Light
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#06b6d4",
                secondary: "#e5e7eb",
                accent: "#0891b2",
                background: "#f0f9ff",
                sidebarBackground: "#e0f2fe",
                headerTextColor: "#0c4a6e",
                bodyTextColor: "#164e63",
                sidebarTextColor: "#0c4a6e",
              }
            })}
            className="p-2 text-xs bg-cyan-400 text-cyan-900 rounded hover:bg-cyan-500"
          >
            Cool Light
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#ec4899",
                secondary: "#e5e7eb",
                accent: "#f472b6",
                background: "#fdf2f8",
                sidebarBackground: "#fce7f3",
                headerTextColor: "#831843",
                bodyTextColor: "#9d174d",
                sidebarTextColor: "#831843",
              }
            })}
            className="p-2 text-xs bg-pink-400 text-pink-900 rounded hover:bg-pink-500"
          >
            Pink Light
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#84cc16",
                secondary: "#e5e7eb",
                accent: "#a3e635",
                background: "#f7fee7",
                sidebarBackground: "#ecfccb",
                headerTextColor: "#365314",
                bodyTextColor: "#3f6212",
                sidebarTextColor: "#365314",
              }
            })}
            className="p-2 text-xs bg-lime-400 text-lime-900 rounded hover:bg-lime-500"
          >
            Fresh Light
          </button>
        </div>

        <h6 className="text-xs font-medium mb-2 text-muted-foreground">Dark Themes</h6>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#fbbf24",
                secondary: "#6b7280",
                accent: "#f59e0b",
                background: "#111827",
                sidebarBackground: "#1f2937",
                headerTextColor: "#f9fafb",
                bodyTextColor: "#e5e7eb",
                sidebarTextColor: "#fbbf24",
              }
            })}
            className="p-2 text-xs bg-gray-800 text-yellow-400 rounded hover:bg-gray-700"
          >
            Dark Gold
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#34d399",
                secondary: "#6b7280",
                accent: "#10b981",
                background: "#0f172a",
                sidebarBackground: "#1e293b",
                headerTextColor: "#f1f5f9",
                bodyTextColor: "#cbd5e1",
                sidebarTextColor: "#34d399",
              }
            })}
            className="p-2 text-xs bg-slate-800 text-emerald-400 rounded hover:bg-slate-700"
          >
            Dark Emerald
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#f472b6",
                secondary: "#6b7280",
                accent: "#ec4899",
                background: "#18181b",
                sidebarBackground: "#27272a",
                headerTextColor: "#fafafa",
                bodyTextColor: "#d4d4d8",
                sidebarTextColor: "#f472b6",
              }
            })}
            className="p-2 text-xs bg-zinc-800 text-pink-400 rounded hover:bg-zinc-700"
          >
            Dark Pink
          </button>
          <button
            onClick={() => onStyleChange({
              colors: {
                primary: "#60a5fa",
                secondary: "#6b7280",
                accent: "#3b82f6",
                background: "#0c1426",
                sidebarBackground: "#1e293b",
                headerTextColor: "#f8fafc",
                bodyTextColor: "#cbd5e1",
                sidebarTextColor: "#60a5fa",
              }
            })}
            className="p-2 text-xs bg-slate-900 text-blue-400 rounded hover:bg-slate-800"
          >
            Dark Ocean
          </button>
        </div>
      </div>
    </div>
  );
}