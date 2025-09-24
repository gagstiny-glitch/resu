import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { StyleSettings } from "@shared/schema";

interface StyleSectionProps {
  style: StyleSettings;
  onStyleChange: (style: Partial<StyleSettings>) => void;
}

export default function StyleSection({ style, onStyleChange }: StyleSectionProps) {
  return (
    <div className="p-6">
      <h4 className="font-medium text-foreground mb-4">Style Settings</h4>
      <div className="space-y-6">
        {/* Font Size */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Font Size</Label>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Header</span>
                <span className="text-sm text-foreground">{style.headerFontSize}px</span>
              </div>
              <Slider
                value={[style.headerFontSize]}
                onValueChange={([value]) => onStyleChange({ headerFontSize: value })}
                min={16}
                max={24}
                step={1}
                className="w-full"
                data-testid="slider-header-font-size"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Body Text</span>
                <span className="text-sm text-foreground">{style.bodyFontSize}px</span>
              </div>
              <Slider
                value={[style.bodyFontSize]}
                onValueChange={([value]) => onStyleChange({ bodyFontSize: value })}
                min={10}
                max={16}
                step={1}
                className="w-full"
                data-testid="slider-body-font-size"
              />
            </div>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Spacing</Label>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Section Spacing</span>
                <span className="text-sm text-foreground">{style.sectionSpacing}px</span>
              </div>
              <Slider
                value={[style.sectionSpacing]}
                onValueChange={([value]) => onStyleChange({ sectionSpacing: value })}
                min={8}
                max={32}
                step={1}
                className="w-full"
                data-testid="slider-section-spacing"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Line Height</span>
                <span className="text-sm text-foreground">{style.lineHeight}</span>
              </div>
              <Slider
                value={[style.lineHeight]}
                onValueChange={([value]) => onStyleChange({ lineHeight: value })}
                min={1.2}
                max={2.0}
                step={0.1}
                className="w-full"
                data-testid="slider-line-height"
              />
            </div>
          </div>
        </div>

        {/* Margins */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Margins</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Top/Bottom</Label>
              <Input
                type="number"
                value={style.marginTop}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 20;
                  onStyleChange({ marginTop: value, marginBottom: value });
                }}
                min={10}
                max={40}
                className="w-full"
                data-testid="input-margin-vertical"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Left/Right</Label>
              <Input
                type="number"
                value={style.marginLeft}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 20;
                  onStyleChange({ marginLeft: value, marginRight: value });
                }}
                min={10}
                max={40}
                className="w-full"
                data-testid="input-margin-horizontal"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Width */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Sidebar Width</Label>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Width</span>
              <span className="text-sm text-foreground">{style.sidebarWidth}%</span>
            </div>
            <Slider
              value={[style.sidebarWidth]}
              onValueChange={([value]) => onStyleChange({ sidebarWidth: value })}
              min={30}
              max={45}
              step={1}
              className="w-full"
              data-testid="slider-sidebar-width"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
