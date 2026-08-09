import React, { useState } from 'react';
import { Video, Sparkles, Copy, Check, Film, Wand2, Play, Layers, Compass, Clapperboard } from 'lucide-react';

export const VideoPromptStudioCard: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Prompt Builder State
  const [subject, setSubject] = useState<string>('Glowing 3D luxury emblem "ELYMORA" floating above glossy obsidian surface');
  const [motion, setMotion] = useState<string>('slow 60fps smooth camera orbital pan and floating particle motion');
  const [lighting, setLighting] = useState<string>('volumetric moody gold illumination with subtle reflections');
  const [camera, setCamera] = useState<string>('shallow depth of field, macro 85mm cinematic lens');
  const [quality, setQuality] = useState<string>('photorealistic 8k, ray-traced reflections, hyper-detailed render');

  const customBuiltPrompt = `${subject}, ${motion}, ${lighting}, ${camera}, ${quality}.`;

  const samplePrompts = [
    {
      id: 'luxury',
      title: '🎬 1. لگژری برانڈ 3D اینیمیشن (Luxury & 3D Logo Reveal)',
      category: 'Runway Gen-3 / Luma / Sora',
      prompt: 'Photorealistic 3D cinematic animation of a glowing golden luxury emblem "ELYMORA" floating gracefully above a dark glossy obsidian surface. Volumetric moody gold lighting, subtle particle dust floating in slow motion, shallow depth of field, 4k resolution, ray-traced reflections, hyper-detailed, smooth 60fps camera pan.',
    },
    {
      id: 'cyberpunk',
      title: '🎨 2. سائبر پنک / فیوچرسٹک AI اینیمیشن (Cyberpunk & AI Tech)',
      category: 'Kling AI / Pika / Runway',
      prompt: 'Cinematic slow-motion video of a futuristic digital AI core glowing with neon violet and blue fiber-optic light streams. Sleek glass interface overlays, intricate metallic circuit nodes expanding in 3D space, volumetric fog, dark futuristic laboratory backdrop, photorealistic 8k, camera slowly zooming in.',
    },
    {
      id: 'islamic',
      title: '📖 3. اسلامی و خطاطی اینیمیشن (Islamic Art & Calligraphy)',
      category: 'Luma Dream Machine / Sora',
      prompt: 'Cinematic slow-panning video of intricate 3D Arabic calligraphy rendered in glowing embossed gold, floating inside a grand arched Islamic architecture with warm ambient rays of light filtering through geometric stained glass, peaceful dust motes floating in slow motion, 8k resolution, photorealistic masterwork.',
    },
    {
      id: 'portrait',
      title: '🎞️ 4. سنیماٹک پورٹریٹ و اینیمیٹڈ کریکٹر (Cinematic Portrait & Motion)',
      category: 'Runway / Sora / Kling AI',
      prompt: 'Cinematic 4k video, close-up shot of a creative media designer working on holographic screen interfaces, vibrant moody neon lighting, dramatic backlight, subtle camera orbital rotation, photorealistic texture, shallow depth of field, masterpiece quality.',
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-2xl space-y-6 text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600/20 border border-amber-500/40 rounded-xl text-amber-400">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">اے آئی ویڈیو اینیمیشن اسٹوڈیو (AI Video Animation Prompts)</h3>
              <span className="bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-[11px] px-2.5 py-0.5 rounded-full font-bold">
                Gen-3 / Sora / Luma
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Runway Gen-3, Luma Dream Machine, Sora, Pika, اور Kling AI کے لیے پیشہ ورانہ پرو پرامپٹس اور گولڈن فارمولا جنریٹر۔
            </p>
          </div>
        </div>
      </div>

      {/* Golden Formula Explanation */}
      <div className="bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-500/30 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
          <Wand2 className="w-4 h-4 text-amber-400" />
          <span>💡 AI ویڈیو اینیمیشن پرامپٹ کا گولڈن فارمولا (The Golden Prompt Formula):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] text-slate-300 pt-1">
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-amber-300 font-bold block mb-0.5">1. موضوع (Subject)</span>
            <span className="text-slate-400">مرکزی چیز یا کردار (e.g. Glowing 3D Emblem)</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-amber-300 font-bold block mb-0.5">2. حرکت (Motion)</span>
            <span className="text-slate-400">اینیمیشن کی رفتار (e.g. Floating in slow motion)</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-amber-300 font-bold block mb-0.5">3. لائٹنگ (Lighting)</span>
            <span className="text-slate-400">روشنی و ماحول (e.g. Volumetric moody gold)</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-amber-300 font-bold block mb-0.5">4. کیمرہ (Camera)</span>
            <span className="text-slate-400">زاویا و لینس (e.g. Shallow depth of field, pan)</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <span className="text-amber-300 font-bold block mb-0.5">5. کوالٹی (Quality)</span>
            <span className="text-slate-400">رزولیوشن (e.g. Photorealistic 8k, ray-traced)</span>
          </div>
        </div>
      </div>

      {/* Interactive Custom Prompt Builder */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Clapperboard className="w-4 h-4 text-amber-400" />
            <span>کسٹم ویڈیو پرامپٹ جنیریٹر (Interactive Prompt Builder):</span>
          </span>
          <button
            onClick={() => copyToClipboard(customBuiltPrompt, 'custom_prompt')}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-amber-600/20"
          >
            {copiedId === 'custom_prompt' ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                <span>پرامپٹ کاپی ہو گیا!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>کسٹم پرامپٹ کاپی کریں</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1">موضوع (Subject):</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white ltr text-left focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">حرکت (Action & Motion):</label>
            <input
              type="text"
              value={motion}
              onChange={(e) => setMotion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white ltr text-left focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">لائٹنگ اور ماحول (Lighting & Atmosphere):</label>
            <input
              type="text"
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white ltr text-left focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">کیمرہ موومنٹ (Camera & Lens):</label>
            <input
              type="text"
              value={camera}
              onChange={(e) => setCamera(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white ltr text-left focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-400 block mb-1 text-xs">رزولیوشن و کوالٹی کی ورڈز (Quality):</label>
          <input
            type="text"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white ltr text-left focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Live Built Prompt Preview */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-amber-300">تیار شدہ نهایی پرامپٹ (Final Compiled Prompt):</span>
          <code className="block bg-slate-950 p-3 rounded-lg text-emerald-300 font-mono text-xs ltr text-left border border-slate-800 leading-relaxed">
            {customBuiltPrompt}
          </code>
        </div>
      </div>

      {/* Ready-to-Use High Quality Prompts */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>ریڈی میڈ پرفیشنل ویڈیو پرامپٹس (Ready-to-Use Master Prompts):</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {samplePrompts.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-slate-200">{item.title}</span>
                  <span className="bg-amber-950/60 text-amber-300 text-[10px] px-2 py-0.5 rounded border border-amber-800 font-mono">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-mono ltr text-left bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mt-2.5 leading-relaxed">
                  "{item.prompt}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => copyToClipboard(item.prompt, item.id)}
                  className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer font-bold"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>کاپی ہو گیا!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>پرامپٹ کاپی کریں</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
