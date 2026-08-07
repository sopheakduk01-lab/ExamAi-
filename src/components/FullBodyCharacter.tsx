import React from 'react';
import { FullBodyCharacter as CharacterType, CharacterGesture, CharacterExpression } from '../data/charactersData';

interface FullBodyCharacterProps {
  character: CharacterType;
  isDancing?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  onClick?: () => void;
  className?: string;
}

export const FullBodyCharacter: React.FC<FullBodyCharacterProps> = ({
  character,
  isDancing = false,
  size = 'md',
  showBadge = true,
  onClick,
  className = ''
}) => {
  const { colors, features, badgeEmoji, danceStyle, id } = character;

  // Gesture and Expression defaults if not specified
  const gesture: CharacterGesture = features.gesture || 'sampeah';
  const expression: CharacterExpression = features.expression || 'cute_sparkle';

  // Size mapping
  const dimensions = {
    sm: { width: 110, height: 155 },
    md: { width: 160, height: 220 },
    lg: { width: 230, height: 300 },
    xl: { width: 310, height: 390 }
  }[size];

  // Dance Animation CSS class
  const getDanceClass = () => {
    if (!isDancing) return 'hover:scale-105 transition-transform duration-300';
    switch (danceStyle) {
      case 'robam-khmer':
        return 'animate-dance-robam';
      case 'hip-hop':
        return 'animate-dance-hiphop';
      case 'disco-spin':
        return 'animate-dance-spin';
      case 'robot':
        return 'animate-dance-robot';
      case 'salsa':
        return 'animate-dance-salsa';
      case 'victory-jump':
        return 'animate-dance-jump';
      case 'moonwalk':
        return 'animate-dance-moonwalk';
      case 'breakdance':
        return 'animate-dance-breakdance';
      case 'magic-float':
        return 'animate-dance-float';
      case 'kun-khmer':
        return 'animate-dance-kunkhmer';
      case 'kpop-bounce':
        return 'animate-dance-kpop';
      case 'floss-dance':
        return 'animate-dance-floss';
      case 'twister':
        return 'animate-dance-twister';
      case 'wave-dance':
        return 'animate-dance-wave';
      default:
        return 'animate-dance-hiphop';
    }
  };

  // Unique SVG IDs for gradients
  const skinGradId = `skinGrad_${id}`;
  const outfitGradId = `outfitGrad_${id}`;
  const hairGradId = `hairGrad_${id}`;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* Background Stage Aura when dancing */}
      {isDancing && (
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-75 animate-pulse pointer-events-none"
          style={{ background: `radial-gradient(circle, ${colors.accent} 20%, #f59e0b 60%, transparent 80%)` }}
        />
      )}

      {/* SVG Full Body Human Character Art */}
      <div className={`relative z-10 w-full h-full flex items-center justify-center ${getDanceClass()}`}>
        <svg
          viewBox="0 0 160 230"
          className="w-full h-full drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* Skin Gradient */}
            <linearGradient id={skinGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.skin} />
              <stop offset="100%" stopColor={colors.skin} stopOpacity="0.88" />
            </linearGradient>

            {/* Outfit Fabric Highlight Gradient */}
            <linearGradient id={outfitGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.outfitTop} />
              <stop offset="100%" stopColor={colors.accent} stopOpacity="0.85" />
            </linearGradient>

            {/* Hair Shine Gradient */}
            <linearGradient id={hairGradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colors.hair} />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Dynamic Floor Shadow */}
          <ellipse
            cx="80"
            cy="218"
            rx={isDancing ? '38' : '44'}
            ry="8"
            fill="rgba(0,0,0,0.22)"
            className="transition-all duration-300"
          />

          {/* CAPE / BACK ACCESSORIES */}
          {(features.accessory === 'cape' || features.outfitType === 'hero' || features.outfitType === 'vampire' || features.outfitType === 'wizard') && (
            <path
              d="M 45 80 L 12 192 Q 80 208 148 192 L 115 80 Z"
              fill={colors.accent || '#ef4444'}
              opacity="0.92"
            />
          )}

          {features.accessory === 'backpack' && (
            <g id="backpack">
              <rect x="36" y="85" width="26" height="44" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <circle cx="49" cy="100" r="4" fill="#38bdf8" />
            </g>
          )}

          {/* LEGS & SHOES */}
          <g id="human-legs">
            {/* Left Leg */}
            <path
              d="M 58 138 Q 54 165 57 195 L 71 195 Q 73 165 72 138 Z"
              fill={colors.outfitBottom}
            />
            {/* Right Leg */}
            <path
              d="M 88 138 Q 87 165 89 195 L 103 195 Q 106 165 102 138 Z"
              fill={colors.outfitBottom}
            />

            {/* Knee Accent Lines */}
            <path d="M 58 162 Q 64 165 71 162" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            <path d="M 89 162 Q 95 165 102 162" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

            {/* Left Shoe */}
            <g id="left-shoe">
              <path d="M 48 200 Q 48 190 68 190 L 73 190 L 73 208 Q 58 208 48 200 Z" fill={colors.shoes} />
              <path d="M 46 200 L 73 200 L 73 205 Q 58 206 46 201 Z" fill="#ffffff" opacity="0.9" />
            </g>

            {/* Right Shoe */}
            <g id="right-shoe">
              <path d="M 87 190 L 92 190 Q 112 190 112 200 Q 102 208 87 208 Z" fill={colors.shoes} />
              <path d="M 87 200 L 114 200 Q 108 205 87 205 Z" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          {/* TORSO & OUTFITS */}
          <g id="human-torso">
            {features.outfitType === 'apsara' ? (
              // Khmer Apsara Traditional Silk & Belt
              <g>
                <path
                  d="M 50 82 Q 80 72 110 82 L 118 152 Q 80 162 42 152 Z"
                  fill={`url(#${outfitGradId})`}
                  stroke="#eab308"
                  strokeWidth="2.5"
                />
                <rect x="46" y="128" width="68" height="12" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <circle cx="80" cy="134" r="5" fill="#ea580c" />
              </g>
            ) : features.outfitType === 'police' ? (
              // Police Officer Uniform
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#1e3a8a" />
                {/* Gold Police Badge */}
                <path d="M 62 92 L 66 88 L 70 92 L 70 98 L 66 102 L 62 98 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
                {/* Tie */}
                <polygon points="78,82 82,82 81,118 79,118" fill="#0f172a" />
                <path d="M 64 80 L 80 98 L 96 80" fill="none" stroke="#ffffff" strokeWidth="2" />
              </g>
            ) : features.outfitType === 'doctor' ? (
              // Doctor Coat & Stethoscope
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                <path d="M 64 80 L 80 110 L 96 80" fill="none" stroke={colors.accent || '#0284c7'} strokeWidth="3" />
                {/* Stethoscope */}
                <path d="M 66 82 Q 80 115 94 82" fill="none" stroke="#334155" strokeWidth="2.5" />
                <circle cx="80" cy="115" r="4" fill="#f59e0b" stroke="#334155" strokeWidth="1" />
              </g>
            ) : features.outfitType === 'chef' ? (
              // Chef Coat & Apron
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
                {/* Double Breasted Buttons */}
                <circle cx="72" cy="95" r="2.5" fill="#0f172a" />
                <circle cx="72" cy="110" r="2.5" fill="#0f172a" />
                <circle cx="72" cy="125" r="2.5" fill="#0f172a" />
                <circle cx="88" cy="95" r="2.5" fill="#0f172a" />
                <circle cx="88" cy="110" r="2.5" fill="#0f172a" />
                <circle cx="88" cy="125" r="2.5" fill="#0f172a" />
                {/* Red Scarf */}
                <path d="M 70 80 Q 80 90 90 80" fill="none" stroke="#ef4444" strokeWidth="4" />
              </g>
            ) : features.outfitType === 'firefighter' ? (
              // Firefighter Jacket
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#b91c1c" />
                {/* Yellow Reflective Stripes */}
                <rect x="50" y="105" width="60" height="6" fill="#facc15" />
                <rect x="50" y="125" width="60" height="6" fill="#facc15" />
              </g>
            ) : features.outfitType === 'bride' ? (
              // Gown / Bridal Dress
              <g>
                <path d="M 52 82 Q 80 78 108 82 L 130 170 Q 80 180 30 170 Z" fill="#f8fafc" stroke="#f1f5f9" strokeWidth="2" />
                <path d="M 64 82 Q 80 96 96 82" fill="none" stroke="#f472b6" strokeWidth="2" />
              </g>
            ) : features.outfitType === 'groom' ? (
              // Tuxedo
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#0f172a" />
                <polygon points="70,80 90,80 80,110" fill="#ffffff" />
                {/* Red Bowtie */}
                <polygon points="74,82 86,82 80,86" fill="#ef4444" />
                <polygon points="74,90 86,90 80,86" fill="#ef4444" />
              </g>
            ) : features.outfitType === 'ninja' ? (
              // Ninja Suit
              <g>
                <path d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z" fill="#020617" />
                <path d="M 60 80 L 80 120 L 100 80" fill="none" stroke="#dc2626" strokeWidth="3" />
              </g>
            ) : (
              // Default Modern Shirt / Jacket
              <g>
                <path
                  d="M 48 80 Q 80 76 112 80 L 108 142 Q 80 148 52 142 Z"
                  fill={`url(#${outfitGradId})`}
                />
                <path d="M 64 80 L 80 104 L 96 80" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                <polygon points="76,82 84,82 82,112 78,112" fill={colors.accent} />
                <circle cx="80" cy="120" r="2" fill="#ffffff" />
                <circle cx="80" cy="130" r="2" fill="#ffffff" />
              </g>
            )}

            {/* Badge / Emoji Chest Icon */}
            <g transform="translate(80, 102)">
              <circle r="12" fill="#ffffff" opacity="0.9" stroke={colors.accent} strokeWidth="1.2" />
              <text textAnchor="middle" dominantBaseline="central" fontSize="13">
                {badgeEmoji}
              </text>
            </g>
          </g>

          {/* ARMS & RICH GESTURES (សំពះ, ជម្រាបសួរ 🤚, ✌️, 🤟, 🫶, 🙋‍♀️, 🙇‍♀️) */}
          <g id="human-arms-and-gestures">
            {gesture === 'sampeah' ? (
              // 1. Khmer Traditional Sampeah (សំពះ) Gesture
              <g id="gesture-sampeah">
                {/* Left Arm folded inward */}
                <path d="M 44 82 Q 55 105 74 100" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                {/* Right Arm folded inward */}
                <path d="M 116 82 Q 105 105 86 100" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                
                {/* Pressed Palms at Chest */}
                <g transform="translate(80, 96)">
                  {/* Left & Right hands joined */}
                  <path d="M -6 6 C -4 -12 0 -16 0 -16 C 0 -16 4 -12 6 6 Z" fill={`url(#${skinGradId})`} />
                  <line x1="0" y1="-14" x2="0" y2="4" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                </g>

                {/* Floating Lotus / Sparkle Effects */}
                <g transform="translate(80, 76)" className="animate-pulse">
                  <path d="M 0 -8 Q 4 -2 8 0 Q 4 2 0 8 Q -4 2 -8 0 Q -4 -2 0 -8 Z" fill="#fef08a" />
                  <circle cx="0" cy="0" r="2" fill="#f59e0b" />
                </g>
              </g>
            ) : gesture === 'wave' ? (
              // 2. Waving Gesture (ជម្រាបសួរ / 🤚)
              <g id="gesture-wave">
                {/* Left Arm relaxed down */}
                <path d="M 44 82 L 32 125" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="32" cy="128" r="6" fill={`url(#${skinGradId})`} />

                {/* Right Arm Waving High */}
                <path d="M 116 82 Q 135 60 140 45" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                {/* Waving Hand Palm & Fingers */}
                <g transform="translate(142, 38)">
                  <circle cx="0" cy="0" r="7" fill={`url(#${skinGradId})`} />
                  {/* 4 Waving Fingers */}
                  <line x1="-4" y1="-6" x2="-4" y2="-12" stroke={`url(#${skinGradId})`} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="-1" y1="-7" x2="-1" y2="-14" stroke={`url(#${skinGradId})`} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="2" y1="-6" x2="2" y2="-13" stroke={`url(#${skinGradId})`} strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="5" y1="-5" x2="5" y2="-10" stroke={`url(#${skinGradId})`} strokeWidth="2.5" strokeLinecap="round" />
                </g>
                {/* Motion Arc Lines */}
                <path d="M 152 28 Q 158 38 154 48" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
              </g>
            ) : gesture === 'peace' ? (
              // 3. Victory / Peace Sign Gesture (✌️)
              <g id="gesture-peace">
                {/* Left Arm relaxed */}
                <path d="M 44 82 L 32 125" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="32" cy="128" r="6" fill={`url(#${skinGradId})`} />

                {/* Right Arm raised near face */}
                <path d="M 116 82 Q 130 95 125 65" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                {/* V Fingers Hand */}
                <g transform="translate(125, 54)">
                  <circle cx="0" cy="4" r="6" fill={`url(#${skinGradId})`} />
                  {/* Index finger */}
                  <line x1="-3" y1="2" x2="-8" y2="-10" stroke={`url(#${skinGradId})`} strokeWidth="3" strokeLinecap="round" />
                  {/* Middle finger */}
                  <line x1="3" y1="2" x2="6" y2="-11" stroke={`url(#${skinGradId})`} strokeWidth="3" strokeLinecap="round" />
                </g>
              </g>
            ) : gesture === 'love' ? (
              // 4. Love / Finger Heart Gesture (🤟)
              <g id="gesture-love">
                {/* Left Arm relaxed */}
                <path d="M 44 82 L 32 125" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="32" cy="128" r="6" fill={`url(#${skinGradId})`} />

                {/* Right Arm bending to make heart/love gesture */}
                <path d="M 116 82 Q 132 88 120 70" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <g transform="translate(120, 60)">
                  <circle cx="0" cy="0" r="6" fill={`url(#${skinGradId})`} />
                  {/* Little Hearts Floating */}
                  <path d="M 0 0 C -4 -6 -8 0 0 6 C 8 0 4 -6 0 0" fill="#f43f5e" transform="translate(6, -14) scale(0.8)" />
                </g>
              </g>
            ) : gesture === 'heart_hands' ? (
              // 5. Heart Hands Gesture (🫶)
              <g id="gesture-heart-hands">
                <path d="M 44 82 Q 58 102 72 98" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <path d="M 116 82 Q 102 102 88 98" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                {/* Heart Shape Made by Hands */}
                <g transform="translate(80, 96)">
                  <path d="M 0 4 C -12 -12 -20 2 0 16 C 20 2 12 -12 0 4" fill="#f43f5e" />
                </g>
              </g>
            ) : gesture === 'raise_hand' ? (
              // 6. Raising Hand High / Cheering (🙋‍♀️)
              <g id="gesture-raise-hand">
                {/* Left Arm high */}
                <path d="M 44 82 Q 25 55 20 40" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="20" cy="34" r="7" fill={`url(#${skinGradId})`} />
                {/* Right Arm high */}
                <path d="M 116 82 Q 135 55 140 40" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="140" cy="34" r="7" fill={`url(#${skinGradId})`} />
              </g>
            ) : (
              // 7. Default Arm Position
              <g id="gesture-default">
                <path d="M 44 82 Q 30 110 32 128" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="32" cy="132" r="6" fill={`url(#${skinGradId})`} />

                <path d="M 116 82 Q 130 110 128 128" fill="none" stroke={colors.outfitTop} strokeWidth="12" strokeLinecap="round" />
                <circle cx="128" cy="132" r="6" fill={`url(#${skinGradId})`} />
              </g>
            )}

            {/* Held Props & Tools */}
            {features.accessory === 'wand' && (
              <g transform="translate(130, 80) rotate(-35)">
                <line x1="0" y1="30" x2="0" y2="-20" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
                <polygon points="0,-25 4,-20 10,-20 6,-16 8,-10 0,-14 -8,-10 -6,-16 -10,-20 -4,-20" fill="#f59e0b" />
              </g>
            )}
            {features.accessory === 'flask' && (
              <g transform="translate(128, 115)">
                <path d="M -6 -10 L 6 -10 L 10 10 Q 0 16 -10 10 Z" fill="#38bdf8" opacity="0.9" stroke="#0284c7" strokeWidth="1.5" />
              </g>
            )}
            {features.accessory === 'books' && (
              <g transform="translate(120, 115)">
                <rect x="-10" y="-14" width="22" height="26" rx="3" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="-6" y1="-6" x2="6" y2="-6" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            )}
            {features.accessory === 'trophy' && (
              <g transform="translate(125, 110)">
                <path d="M -8 -12 L 8 -12 L 6 0 Q 0 6 -6 0 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="1" />
                <rect x="-3" y="6" width="6" height="8" fill="#d97706" />
                <rect x="-8" y="14" width="16" height="5" rx="1" fill="#78350f" />
              </g>
            )}
            {features.accessory === 'laptop' && (
              <g transform="translate(120, 118)">
                <rect x="-12" y="-10" width="24" height="16" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="-8" y="-7" width="16" height="10" rx="1" fill="#0284c7" />
              </g>
            )}
          </g>

          {/* CUTE HUMAN HEAD, ADORABLE FACE & EXPRESSIONS (មុខធំជាងខ្លួន Cute ស្អាតខ្លាំង 😆) */}
          <g id="human-head" transform="translate(80, 52) scale(1.35) translate(-80, -52)">
            {/* Neck */}
            <path d="M 72 68 L 72 82 L 88 82 L 88 68 Z" fill={`url(#${skinGradId})`} />

            {/* Neck Shadow Line */}
            <path d="M 72 72 Q 80 76 88 72" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />

            {/* Ears with Inner Detail */}
            <g id="ears">
              <ellipse cx="50" cy="48" rx="5.5" ry="8" fill={colors.skin} />
              <ellipse cx="49.5" cy="48" rx="3" ry="5" fill="#f472b6" opacity="0.35" />
              
              <ellipse cx="110" cy="48" rx="5.5" ry="8" fill={colors.skin} />
              <ellipse cx="110.5" cy="48" rx="3" ry="5" fill="#f472b6" opacity="0.35" />
            </g>

            {/* Chibi Cute Rounded Head & Jaw Contour */}
            <path
              d="M 50 42 C 50 18, 110 18, 110 42 C 110 64, 96 74, 80 74 C 64 74, 50 64, 50 42 Z"
              fill={`url(#${skinGradId})`}
            />

            {/* Soft Forehead & Nose Glow Highlight */}
            <ellipse cx="80" cy="35" rx="16" ry="7" fill="#ffffff" opacity="0.2" />

            {/* SPECIAL HATS & HEADWEAR */}
            {features.outfitType === 'police' && (
              // Police Cap
              <g id="police-cap">
                <path d="M 46 36 Q 80 12 114 36 Z" fill="#1e3a8a" />
                <path d="M 44 36 Q 80 30 122 38 L 114 42 Z" fill="#0f172a" />
                <circle cx="80" cy="26" r="4" fill="#f59e0b" />
              </g>
            )}

            {features.outfitType === 'chef' && (
              // Chef Hat (Toque Blanche)
              <g id="chef-hat">
                <path d="M 52 38 Q 40 10 60 4 Q 80 -4 100 4 Q 120 10 108 38 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <rect x="52" y="30" width="56" height="10" rx="2" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              </g>
            )}

            {features.outfitType === 'firefighter' && (
              // Firefighter Helmet
              <g id="firefighter-helmet">
                <path d="M 46 38 Q 80 10 114 38 Z" fill="#b91c1c" />
                <path d="M 42 38 Q 80 32 124 40 L 114 43 Z" fill="#facc15" />
                <polygon points="80,18 74,28 86,28" fill="#f59e0b" />
              </g>
            )}

            {features.outfitType === 'wizard' && (
              // Wizard Hat
              <g id="wizard-hat">
                <path d="M 48 38 L 80 -18 L 112 38 Z" fill="#4c1d95" />
                <ellipse cx="80" cy="38" rx="36" ry="8" fill="#6d28d9" />
                <polygon points="80,-5 83,0 88,0 84,4 86,9 80,6 74,9 76,4 72,0 77,0" fill="#fef08a" />
              </g>
            )}

            {features.outfitType === 'santa' && (
              // Santa Hat
              <g id="santa-hat">
                <path d="M 48 36 Q 80 4 116 28 L 130 45 Z" fill="#dc2626" />
                <rect x="46" y="32" width="68" height="10" rx="5" fill="#ffffff" />
                <circle cx="132" cy="46" r="7" fill="#ffffff" />
              </g>
            )}

            {features.outfitType === 'hijab' && (
              // Hijab Headscarf
              <g id="hijab">
                <path d="M 46 44 C 44 12, 116 12, 114 44 C 114 78, 108 86, 80 86 C 52 86, 46 78, 46 44 Z" fill={colors.hair || '#d97706'} />
                {/* Inner Face Opening */}
                <ellipse cx="80" cy="46" rx="24" ry="26" fill={`url(#${skinGradId})`} />
              </g>
            )}

            {/* Standard Hairstyles */}
            {features.hairStyle === 'crown' && (
              <g id="khmer-crown">
                <path d="M 48 38 L 56 8 L 68 24 L 80 2 L 92 24 L 104 8 L 112 38 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
                <circle cx="80" cy="16" r="4" fill="#ef4444" />
              </g>
            )}

            {features.hairStyle === 'cap' && features.outfitType !== 'police' && (
              <g id="baseball-cap">
                <path d="M 48 38 Q 80 14 112 38 Z" fill={colors.accent} />
                <path d="M 46 38 Q 80 34 126 42 L 112 45 Z" fill={colors.accent} />
              </g>
            )}

            {features.hairStyle === 'ponytail' && features.outfitType !== 'hijab' && (
              <g id="ponytail-hair">
                <path d="M 50 44 C 48 16, 112 16, 110 44 C 102 28, 58 28, 50 44 Z" fill={`url(#${hairGradId})`} />
                <ellipse cx="114" cy="38" rx="14" ry="22" fill={colors.hair} transform="rotate(20 114 38)" />
              </g>
            )}

            {features.hairStyle === 'bun' && features.outfitType !== 'hijab' && (
              <g id="bun-hair">
                <path d="M 50 44 C 48 16, 112 16, 110 44 C 102 28, 58 28, 50 44 Z" fill={`url(#${hairGradId})`} />
                <circle cx="80" cy="14" r="16" fill={colors.hair} />
                <circle cx="80" cy="14" r="6" fill={colors.accent} />
              </g>
            )}

            {features.hairStyle === 'spiky' && features.outfitType !== 'police' && (
              <path
                d="M 50 40 L 54 18 L 64 26 L 72 10 L 82 24 L 92 12 L 102 28 L 110 40 Z"
                fill={`url(#${hairGradId})`}
              />
            )}

            {features.hairStyle === 'short' && features.outfitType !== 'hijab' && features.outfitType !== 'police' && features.outfitType !== 'chef' && (
              <path
                d="M 50 42 C 48 20, 112 20, 110 42 C 98 28, 62 28, 50 42 Z"
                fill={`url(#${hairGradId})`}
              />
            )}

            {features.hairStyle === 'ears' && (
              <g id="cat-ears">
                <polygon points="54,28 44,4 66,20" fill={colors.hair} />
                <polygon points="52,24 46,8 62,18" fill="#f43f5e" />
                <polygon points="106,28 116,4 94,20" fill={colors.hair} />
                <polygon points="108,24 114,8 98,18" fill="#f43f5e" />
              </g>
            )}

            {/* EYEBROWS (Cute Arch with Soft Shadow) */}
            <path d="M 61 38 Q 69 33 77 39" fill="none" stroke={colors.hair || '#1e293b'} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 83 39 Q 91 33 99 38" fill="none" stroke={colors.hair || '#1e293b'} strokeWidth="2.5" strokeLinecap="round" />

            {/* ADORABLE CUTE EYES & EXPRESSIONS (មុខ Cute Cute 😆) */}
            {expression === 'wink' ? (
              // Wink Expression
              <g id="eye-expression-wink">
                {/* Left Eye: Open Sparkling Pupil */}
                <g>
                  <ellipse cx="68" cy="48" rx="8" ry="9.5" fill="#020617" />
                  <ellipse cx="68" cy="49" rx="6" ry="7" fill={colors.accent || '#3b82f6'} opacity="0.8" />
                  <circle cx="65" cy="45" r="3.8" fill="#ffffff" />
                  <circle cx="71" cy="51" r="2" fill="#ffffff" />
                  <path d="M 58 45 Q 68 37 78 45" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 56 43 L 53 40" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
                </g>
                {/* Right Eye: Cute Winking Arc */}
                <g>
                  <path d="M 83 48 Q 91 38 99 48" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 100 45 L 104 42" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <polygon points="103,39 105,42 108,39 106,44" fill="#f59e0b" />
                </g>
              </g>
            ) : expression === 'joy' ? (
              // Joyful Happy Eyes (^ v ^)
              <g id="eye-expression-joy">
                <path d="M 59 50 Q 68 38 77 50" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 57 46 L 54 43" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                <path d="M 83 50 Q 92 38 101 50" fill="none" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 103 46 L 106 43" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : expression === 'star_eyes' ? (
              // Starry Glowing Eyes
              <g id="eye-expression-star">
                <circle cx="68" cy="48" r="8.5" fill="#f59e0b" />
                <polygon points="68,41 70,45 75,45 71,48 73,53 68,50 63,53 65,48 61,45 66,45" fill="#ffffff" />
                <circle cx="92" cy="48" r="8.5" fill="#f59e0b" />
                <polygon points="92,41 94,45 99,45 95,48 97,53 92,50 87,53 89,48 85,45 90,45" fill="#ffffff" />
              </g>
            ) : (
              // Default Super Cute Anime Sparkling Eyes (ភ្នែកភ្លឺចែងចាំង)
              <g id="eye-expression-cute-sparkle">
                {/* Left Eye */}
                <g>
                  <ellipse cx="68" cy="48" rx="8" ry="10" fill="#0f172a" />
                  {/* Iris Color Gradient */}
                  <ellipse cx="68" cy="50" rx="6.5" ry="7" fill={colors.accent || '#8b5cf6'} opacity="0.85" />
                  <ellipse cx="68" cy="52" rx="4.5" ry="4" fill="#a855f7" />
                  {/* Main Large White Highlight */}
                  <ellipse cx="65" cy="44" rx="3.5" ry="4" fill="#ffffff" />
                  {/* Secondary Sparkle Highlight */}
                  <circle cx="72" cy="51" r="2" fill="#ffffff" />
                  <circle cx="63" cy="51" r="1" fill="#ffffff" />
                  {/* Eyeliner & Lashes */}
                  <path d="M 58 46 Q 68 37 78 46" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 56 43 L 52 39" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 78 43 L 81 40" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
                </g>

                {/* Right Eye */}
                <g>
                  <ellipse cx="92" cy="48" rx="8" ry="10" fill="#0f172a" />
                  {/* Iris Color Gradient */}
                  <ellipse cx="92" cy="50" rx="6.5" ry="7" fill={colors.accent || '#8b5cf6'} opacity="0.85" />
                  <ellipse cx="92" cy="52" rx="4.5" ry="4" fill="#a855f7" />
                  {/* Main Large White Highlight */}
                  <ellipse cx="89" cy="44" rx="3.5" ry="4" fill="#ffffff" />
                  {/* Secondary Sparkle Highlight */}
                  <circle cx="96" cy="51" r="2" fill="#ffffff" />
                  <circle cx="87" cy="51" r="1" fill="#ffffff" />
                  {/* Eyeliner & Lashes */}
                  <path d="M 82 46 Q 92 37 102 46" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M 104 43 L 108 39" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 82 43 L 79 40" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" />
                </g>
              </g>
            )}

            {/* CUTE NOSE */}
            <g id="cute-nose">
              <ellipse cx="80" cy="56" rx="1.8" ry="1.2" fill="#e11d48" opacity="0.35" />
              <circle cx="79.5" cy="55.5" r="0.6" fill="#ffffff" opacity="0.8" />
            </g>

            {/* GLASSES */}
            {features.glasses && (
              <g stroke="#0f172a" strokeWidth="2" fill="none">
                <rect x="57" y="41" width="22" height="15" rx="5" fill="rgba(255,255,255,0.25)" />
                <rect x="81" y="41" width="22" height="15" rx="5" fill="rgba(255,255,255,0.25)" />
                <line x1="79" y1="48" x2="81" y2="48" />
              </g>
            )}

            {/* CUTE MOUTH & SMILE WITH GLOSS */}
            {expression === 'cat_mouth' ? (
              // Cute :3 Cat Mouth
              <g id="cat-mouth">
                <path d="M 72 61 Q 76 65 80 61 Q 84 65 88 61" fill="none" stroke="#be123c" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="80" cy="63" rx="1.5" ry="0.8" fill="#f43f5e" />
              </g>
            ) : isDancing ? (
              // Joyful Open Smile with Tongue & Gloss
              <g id="dancing-smile">
                <path d="M 68 60 Q 80 75 92 60 Z" fill="#9f1239" />
                <path d="M 71 61 Q 80 66 89 61 Z" fill="#ffffff" />
                <ellipse cx="80" cy="69" rx="5.5" ry="3.5" fill="#f43f5e" />
                <circle cx="78" cy="68" r="1" fill="#ffffff" opacity="0.9" />
              </g>
            ) : (
              // Adorable Curved Lip & Smile
              <g id="friendly-smile">
                <path d="M 71 61 Q 80 71 89 61" fill="none" stroke="#be123c" strokeWidth="2.8" strokeLinecap="round" />
                {/* Lip Shine Gloss */}
                <ellipse cx="80" cy="64" rx="3.5" ry="1.5" fill="#f43f5e" opacity="0.6" />
                <ellipse cx="79" cy="63.5" rx="1.2" ry="0.6" fill="#ffffff" opacity="0.8" />
              </g>
            )}

            {/* ROSY BLUSHING CHEEKS WITH SPARKLE SHINE (ថ្ពាល់ផ្កាឈូក Cute 💖) */}
            <g id="rosy-cheeks">
              {/* Left Blush */}
              <ellipse cx="57" cy="57" rx="7" ry="4" fill="#f43f5e" opacity="0.5" />
              <circle cx="55" cy="55.5" r="1.2" fill="#ffffff" />
              <circle cx="59" cy="57.5" r="0.8" fill="#ffffff" />

              {/* Right Blush */}
              <ellipse cx="103" cy="57" rx="7" ry="4" fill="#f43f5e" opacity="0.5" />
              <circle cx="101" cy="55.5" r="1.2" fill="#ffffff" />
              <circle cx="105" cy="57.5" r="0.8" fill="#ffffff" />
            </g>

            {/* Sparkles around head */}
            <g transform="translate(42, 22)" className="animate-spin-slow">
              <path d="M 0 -5 L 1.2 -1.2 L 5 0 L 1.2 1.2 L 0 5 L -1.2 1.2 L -5 0 L -1.2 -1.2 Z" fill="#fef08a" />
            </g>
            <g transform="translate(118, 22)" className="animate-pulse">
              <path d="M 0 -5 L 1.2 -1.2 L 5 0 L 1.2 1.2 L 0 5 L -1.2 1.2 L -5 0 L -1.2 -1.2 Z" fill="#fef08a" />
            </g>
          </g>
        </svg>
      </div>

      {/* Character Name Tag */}
      {showBadge && (
        <div className="mt-1 text-center max-w-full px-2">
          <span className="inline-block text-[11px] sm:text-xs font-bold font-moul text-amber-950 dark:text-amber-100 truncate bg-white/95 dark:bg-slate-900/95 px-2.5 py-0.5 rounded-md border border-amber-300/80 shadow-xs">
            {character.name}
          </span>
        </div>
      )}
    </div>
  );
};
