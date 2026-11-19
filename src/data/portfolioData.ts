export type PageId = 'home' | 'works' | 'social' | 'contact';

export interface ImpactMetric {
  id: string;
  client: string;
  value: string;
  label: string;
  description: string;
  period: string;
}

export interface WorkSlide {
  id: string;
  image: string;
  caption: string;
  alt: string;
  tag: string;
  isReservedSlot?: boolean;
  slotSpec?: string;
}

export type WorkTag =
  | 'Project & Campaign Systems'
  | 'Key Visual System'
  | 'In-App Experience'
  | 'Social Engagement'
  | 'Microsite'
  | 'Email & eDM Design';

export const ALL_WORK_TAGS: WorkTag[] = [
  'Project & Campaign Systems',
  'Key Visual System',
  'In-App Experience',
  'Social Engagement',
  'Microsite',
  'Email & eDM Design',
];

export interface WorkItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  client: string;
  year: string;
  origin: 'Singtel' | 'OPPO' | 'OPPO & Singtel' | 'Prototype Slot';
  slotStatus: 'Case Study' | 'Reserved Slot';
  category:
    | 'Digital Experience'
    | 'Workflow & Templates'
    | 'Brand & Localization'
    | 'Retail & Spatial';
  tags: WorkTag[];
  excerpt: string;
  overview: string;
  deliverables: string[];
  outcome: string;
  slides: WorkSlide[];
  externalUrl?: string;
}

export interface SocialAccount {
  id: string;
  platform: string;
  handle: string;
  url: string;
  role: string;
  description: string;
  recentNote: string;
  updatedAt: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  level: string;
  focus: string;
  isActive?: boolean;
}

export interface SkillGroup {
  id: string;
  label: string;
  title: string;
  skills: string[];
  summary: string;
}

export const HERO_PORTRAIT_IMAGE =
  '/assets/aistudio/Frame_1_135e7fe7.png';
export const STUDIO_DESK_IMAGE =
  '/src/assets/images/blog_studio_desk_1794967350139.jpg';

const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/inaHlbue26RBE2Qv2R7iOr/Portfolio?node-id=1176-754&starting-point-node-id=1176%3A754&t=sd6m1xRvPGArZ1gC-1';

export const CONTACT_INFO = {
  name: 'Tranxy Chong',
  title: 'Digital Experience | Product Operations',
  email: 'xjchong22@gmail.com',
  phone: '+65 85033386',
  location: 'Singapore',
  linkedin: 'https://www.linkedin.com/in/tranxy-chong',
  figmaPortfolio: FIGMA_PROTOTYPE_URL,
  figmaDesign:
    'https://www.figma.com/design/inaHlbue26RBE2Qv2R7iOr/Portfolio?node-id=0-1&t=vaGp1g2DfHGAPuu2-1',
};

export const IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'singtel-templates',
    client: 'SINGTEL',
    value: '3 Kits',
    label: 'Channel Templates',
    description:
      'Built reusable visual templates across web, in-app, paid media, and social to standardize recurring Flash Sale and Tech Show delivery.',
    period: '2024 – PRESENT',
  },
  {
    id: 'singtel-platforms',
    client: 'MYSINGTEL',
    value: '4x',
    label: 'Platform Alignment',
    description:
      'Translated Singapore business objectives into digital specifications across four core digital platforms.',
    period: 'APP & WEB',
  },
  {
    id: 'oppo-sg',
    client: 'OPPO SG',
    value: '100%',
    label: 'Launch Consistency',
    description:
      'Aligned China HQ flagship product specs and local promotions across website, in-app, and retail booths.',
    period: '2023 – 2024',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Requirement Scoping',
    en: 'Define',
    description:
      'Translate market business objectives into clear functional requirements and digital specifications before execution begins.',
    tilt: 'md:-rotate-2',
  },
  {
    step: '02',
    title: 'UX Journey Audit',
    en: 'Evaluate',
    description:
      'Audit App and web touchpoints systematically to surface usability gaps, visual friction, and journey inconsistencies.',
    tilt: 'md:rotate-1',
  },
  {
    step: '03',
    title: 'Template Systems',
    en: 'Standardize',
    description:
      'Build reusable visual frameworks that lock brand consistency while keeping campaign dates and offers flexible.',
    tilt: 'md:-rotate-1',
  },
  {
    step: '04',
    title: 'Cross-Team Delivery',
    en: 'Launch',
    description:
      'Coordinate Product, Marketing, e-Shop, and HQ teams for unified releases and post-launch submission guidelines.',
    tilt: 'md:rotate-2',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'singtel',
    role: 'Creative Technology',
    company: 'Singtel',
    period: 'Feb 2024 – Present',
    location: 'Singapore',
    highlights: [
      'Translated Singapore market business objectives into functional requirements and digital specs across four core platforms with Product, Marketing, and Mass Communications.',
      'Conducted UX audits across MySingtel App and web touchpoints to identify usability gaps and evaluate proposed design directions.',
      'Developed a reusable visual template system for Flash Sale and Tech Show campaigns to standardize recurring omnichannel delivery.',
      'Established three key visual templates across online store, in-app, paid media, and social channels alongside post-launch submission guidelines.',
    ],
  },
  {
    id: 'oppo',
    role: 'Digital Designer',
    company: 'OPPO',
    period: 'Jan 2023 – Feb 2024',
    location: 'Singapore',
    highlights: [
      'Coordinated with China HQ on pricing, launch timelines, and campaign messaging for flagship smartphone releases in Singapore.',
      'Adapted HQ product specifications and promotional offers for the local market across the official website and in-app channels.',
      'Owned key visuals for Singapore launches and produced retail materials and booth assets for consistent omnichannel execution.',
    ],
  },
];

export const EDUCATIONS: EducationItem[] = [
  {
    id: 'oum',
    degree: 'Bachelor in Digital Media with Honours',
    school: 'Open University Malaysia',
    period: 'Jan 2026 – Present',
    level: 'Honours Degree · In Progress',
    focus:
      'Expanding strategic digital media systems, interactive design thinking, and honours-level research alongside full-time product operations.',
    isActive: true,
  },
  {
    id: 'raffles-diploma',
    degree: 'Diploma in Creative New Media Technology',
    school: 'Raffles College of Higher Education',
    period: 'Sept 2020 – Dec 2022',
    level: 'Diploma · Completed',
    focus:
      'Built practical fluency across interactive UI/UX fundamentals, digital media production workflows, and front-end web foundations.',
  },
  {
    id: 'raffles-cert',
    degree: 'Certificate in Design',
    school: 'Raffles College of Higher Education',
    period: 'May 2019 – Sept 2020',
    level: 'Foundation · Completed',
    focus:
      'Established core visual hierarchy, typography, composition, and color discipline guiding cross-channel brand consistency.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'requirements',
    label: 'Requirements & UX',
    title: 'Requirements & Digital Experience',
    skills: [
      'Business Requirements Clarification',
      'Requirement Scoping',
      'UI/UX Design Support',
      'UI/UX Issue Identification',
      'Design Requirements Documentation',
    ],
    summary:
      'Bridging commercial goals and product execution through early requirement scoping, UX audits, and clear documentation.',
  },
  {
    id: 'process',
    label: 'Process & Delivery',
    title: 'Process & Delivery',
    skills: [
      'Workflow Standardization',
      'Process Improvement',
      'Project Documentation',
      'Digital Project Coordination',
      'Template Development',
    ],
    summary:
      'Transforming ad-hoc production into scalable template workflows for consistent, repeatable recurring campaign delivery.',
  },
  {
    id: 'stakeholder',
    label: 'Stakeholders',
    title: 'Stakeholder & Alignment',
    skills: [
      'Cross-functional Coordination',
      'Stakeholder Communication',
      'HQ & Regional Alignment',
      'Business & Team Coordination',
    ],
    summary:
      'Aligning regional HQ, Product, e-Shop, and Mass Communications teams to ship consistent omnichannel experiences.',
  },
  {
    id: 'technical',
    label: 'Design & Tech',
    title: 'Design & Technical Skills',
    skills: [
      'Figma & Prototyping',
      'UX/UI Design Fundamentals',
      'Visual Guidelines & Consistency',
      'HTML/CSS Fundamentals',
    ],
    summary:
      'Pairing Figma systems and visual governance with HTML/CSS fluency to collaborate seamlessly with engineering.',
  },
];

export const WORKS_DATA: WorkItem[] = [
  {
    id: 'online-flash-sale',
    index: '01',
    title: 'Online Flash Sale',
    subtitle: 'Monthly Scheduled Campaign · Official Website, In-App & Paid Media',
    client: 'Singtel · Official Website, In-App & Paid Media',
    year: '2024 – 2026',
    origin: 'Singtel',
    slotStatus: 'Case Study',
    category: 'Digital Experience',
    tags: [
      'Project & Campaign Systems',
      'Key Visual System',
      'In-App Experience',
      'Social Engagement',
    ],
    excerpt:
      'High-impact recurring monthly flash sale campaign launched on specified dates across Official Website, MySingtel In-App, and Paid Media.',
    overview:
      'Directed the visual execution and modular system for Singtel’s recurring Online Flash Sale—activating on designated monthly windows (such as 6–13 Feb, 10–13 Feb, and 9–17 May) across Official Website heroes, MySingtel In-App push alerts, Top Picks and Shop Hot Deals, alongside Paid Media carousels. Locked typographic hierarchy and date-badge lockups keep multi-channel delivery cohesive across recurring monthly rollouts.',
    deliverables: [
      'Official Website Key Visuals',
      'MySingtel In-App Placements',
      'Paid Media & Social Carousels',
      'Modular Monthly Date Lockups',
    ],
    outcome:
      'Deployed unified flash sale visuals across Official Website, In-App, and Paid Media on scheduled monthly dates with consistent modular execution.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'ofs-1',
        image: '/assets/aistudio/OFS_01_39dc09bd.jpg',
        caption: '01 / Official Website broadband hero & modular date-lockup variations (6–13 Feb / 10–13 Feb)',
        alt: 'Laptop displaying Singtel Online Flash Sale broadband homepage beside lockup variations',
        tag: 'Official Website',
      },
      {
        id: 'ofs-2',
        image: '/assets/aistudio/OFS_02_67f81e19.jpg',
        caption: '02 / Key visual & Paid Media offer banners (Pixel 10 Pro Fold, Wi-Fi 7 Router & Samsung TV)',
        alt: '10-13 Feb Online Flash Sale key visual with Google Pixel 10 Pro Fold, Wi-Fi 7 Router, and Samsung Q6F TV cards',
        tag: 'Paid Media',
      },
      {
        id: 'ofs-3',
        image: '/assets/aistudio/OFS_03_f081b48a.jpg',
        caption: '03 / Official Website promotional banner paired with MySingtel In-App push notification',
        alt: 'Singtel Official Website promotional slider alongside mobile In-App flash sale push alert',
        tag: 'Web & In-App Push',
      },
      {
        id: 'ofs-4',
        image: '/assets/aistudio/OFS_04_de5db541.jpg',
        caption: '04 / MySingtel In-App Top Picks, Shop Hot Deals (9–17 May) & modular visual tiles',
        alt: 'MySingtel mobile app Top Picks and Shop Hot Deals placements with standalone flash sale tiles',
        tag: 'In-App Experience',
      },
      {
        id: 'ofs-5',
        image: '/assets/aistudio/OFS_05_07d3c4c7.jpg',
        caption: '05 / Paid Social & Instagram broadband carousel showcase (3Gbps, 5Gbps & 10Gbps)',
        alt: 'Instagram post mockup and four broadband Wi-Fi 7 router carousel tiles with free gift callouts',
        tag: 'Social · Broadband',
      },
      {
        id: 'ofs-6',
        image: '/assets/aistudio/OFS_06_0d13166f.jpg',
        caption: '06 / Paid Social & Instagram device and broadband campaign carousel tiles',
        alt: 'Instagram post mockup paired with Pixel 10 Pro XL, broadband free gift, and Singtel end-card tiles',
        tag: 'Social · Devices',
      },
    ],
  },
  {
    id: 'huat-huat-promo',
    index: '02',
    title: 'Huat Huat Promo',
    subtitle: 'APAC New Year Campaign · Key Visual, Social, EDM & In-App',
    client: 'OPPO · Key Visuals, Social, EDM & E-Commerce',
    year: '2024',
    origin: 'OPPO',
    slotStatus: 'Case Study',
    category: 'Brand & Localization',
    tags: [
      'Key Visual System',
      'Social Engagement',
      'Email & eDM Design',
      'In-App Experience',
    ],
    excerpt:
      'End-to-end creative direction for OPPO’s New Year campaign across key visuals, e-commerce storefronts, social media, and EDM.',
    overview:
      'Led creative direction end-to-end across key visuals, social media, and EDM, defining the campaign’s visual language from concept through to final execution. Directed how the New Year theme translated across formats and markets, balancing festive storytelling with brand consistency, and ensuring the visual system held together across every regional touchpoint.',
    deliverables: [
      'Campaign Key Visuals',
      'Lazada & Shopee Storefront',
      'Social & EDM Templates',
      'My OPPO In-App Assets',
    ],
    outcome:
      'Delivered a cohesive festive campaign identity across key visual, social, email and digital touchpoints, enabling localized APAC execution while maintaining a consistent OPPO brand presence.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'hhp-1',
        image: '/assets/aistudio/HHP_01_1f1c57e9.jpg',
        caption: '01 / Flagship CNY campaign hero & e-commerce storefront banner (Lazada & Shopee Mall)',
        alt: 'Laptop showing OPPO Huat Huat Promo 02-04 Feb Chinese New Year campaign hero on Lazada and Shopee Mall',
        tag: 'Key Visual & Storefront',
      },
      {
        id: 'hhp-2',
        image: '/assets/aistudio/HHP_02_092643a3.jpg',
        caption: '02 / Responsive tablet catalog for Find N3 & Find N3 Flip festive bundles',
        alt: 'Tablet mockup showcasing OPPO Find N Series Huat Huat Promo catalog with Find N3 and Find N3 Flip',
        tag: 'Flagship Series Grid',
      },
      {
        id: 'hhp-3',
        image: '/assets/aistudio/HHP_03_030601a8.jpg',
        caption: '03 / Reno11 5G & A79 5G purchase-with-purchase storefront cards and dividers',
        alt: 'OPPO Reno Series promotional banner alongside Reno11 5G and A79 5G bundle cards',
        tag: 'Product Offer Cards',
      },
      {
        id: 'hhp-4',
        image: '/assets/aistudio/HHP_04_a40ac24f.jpg',
        caption: '04 / Modular A Series, Tablet & Audio storefront cards with OPPO Pad2',
        alt: 'OPPO Best Selling A Series and Tablet and Audio festive storefront headers with OPPO Pad2 offer',
        tag: 'Ecosystem & Tablet',
      },
      {
        id: 'hhp-5',
        image: '/assets/aistudio/HHP_05_38f70684.jpg',
        caption: '05 / Instagram feed post and vertical EDM / Story key visual adaptation',
        alt: 'Mobile Instagram post mockup beside vertical Huat Huat Promo EDM and Story key visual',
        tag: 'Social & EDM Visual',
      },
      {
        id: 'hhp-6',
        image: '/assets/aistudio/HHP_06_f8b7c0a4.jpg',
        caption: '06 / My OPPO in-app promotional banner suite across multi-aspect placements',
        alt: 'Three My OPPO in-app Huat Huat Promo banner sizes arranged side by side',
        tag: 'My OPPO In-App',
      },
    ],
  },
  {
    id: 'ny-new-year-promo',
    index: '03',
    title: '1.1 New Year Promo',
    subtitle: 'APAC New Year Sale · Key Visual, Social, EDM & E-Commerce',
    client: 'OPPO · Lazada, Shopee Mall, Social & EDM',
    year: '2024',
    origin: 'OPPO',
    slotStatus: 'Case Study',
    category: 'Brand & Localization',
    tags: [
      'Key Visual System',
      'Social Engagement',
      'Email & eDM Design',
      'Project & Campaign Systems',
    ],
    excerpt:
      'End-to-end 1.1 New Year campaign creatives translated across key visuals, social media, EDM, and marketplace touchpoints.',
    overview:
      'Led creative direction across key visuals, social media, EDM, and e-commerce assets, translating the campaign’s visual language into promotional and product-focused executions. Adapted the system across different formats and marketplace requirements while maintaining a consistent brand presence.',
    deliverables: [
      'Marketplace Key Visuals',
      'Product & Bundle Cards',
      'Social & EDM Templates',
      'Brand Membership Assets',
    ],
    outcome:
      'Delivered a cohesive New Year campaign system across promotional, product, social, and marketplace touchpoints, supporting localized APAC execution while maintaining a consistent OPPO brand identity.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'ny-1',
        image: '/assets/aistudio/NY_01_577ca333.jpg',
        caption: '01 / Lazada 1.1 New Year Sale key visual, Find N3 Series offers & Brand Membership modules',
        alt: 'OPPO Lazada 1.1 New Year Sale campaign boards showing hero key visual, Find N3 Series, offers, and Brand Membership',
        tag: 'Marketplace Overview',
      },
      {
        id: 'ny-2',
        image: '/assets/aistudio/NY_02_853331d4.jpg',
        caption: '02 / Marketplace promotional offer breakdown, Voucher Reimbursement & 0% Installment mechanics',
        alt: 'New Year Offers mechanics showing 5 percent off, LazBonus, free shipping, Voucher Reimbursement, and 0 percent installment plan',
        tag: 'Promo Mechanics',
      },
      {
        id: 'ny-3',
        image: '/assets/aistudio/NY_03_e120e672.jpg',
        caption: '03 / Product-focused e-commerce bundle cards across OPPO Pad2, Pad Air & A79 5G',
        alt: 'OPPO Pad2 Bundle $888 alongside A79 5G, OPPO Pad Air, and OPPO Pad2 product promo cards',
        tag: 'Product Bundles',
      },
      {
        id: 'ny-4',
        image: '/assets/aistudio/NY_04_fdcae4f9.jpg',
        caption: '04 / Instagram feed post paired with vertical EDM / Story promotional adaptation',
        alt: 'Mobile Instagram feed post and vertical EDM key visual for 1 Jan 2024 New Year, New You promo',
        tag: 'Social & EDM Visual',
      },
      {
        id: 'ny-5',
        image: '/assets/aistudio/NY_05_f8951678.jpg',
        caption: '05 / Shopee Mall Brand Membership social post & Customer Appreciation Day vertical asset',
        alt: 'Instagram post and Shopee Mall vertical card for OPPO Brand Membership Customer Appreciation Day',
        tag: 'Social & Loyalty',
      },
      {
        id: 'ny-6',
        image: '/assets/aistudio/NY_06_04877f9f.jpg',
        caption: '06 / Tablet presentation of the flagship 2024 New Year, New You golden key visual',
        alt: 'Tablet mockup displaying OPPO 2024 New Year, New You Save Up To 50 percent flagship visual',
        tag: 'Campaign Key Visual',
      },
    ],
  },
  {
    id: 'social-campaign-always-on',
    index: '04',
    title: 'Social Content & Always-On Visuals',
    subtitle: 'OPPO & Singtel · Campaign Adaptations & Always-On Social',
    client: 'OPPO & Singtel · Social Media',
    year: '2023 – 2026',
    origin: 'OPPO & Singtel',
    slotStatus: 'Case Study',
    category: 'Digital Experience',
    tags: [
      'Social Engagement',
      'Key Visual System',
      'Project & Campaign Systems',
    ],
    excerpt:
      'High-volume social media assets and always-on content adapted from campaign systems across OPPO and Singtel.',
    overview:
      'Produced high-volume social assets adapted from campaign visual systems, alongside regular always-on content maintaining brand consistency across channels. Balanced fast-turnaround production needs with visual alignment to each brand’s broader creative direction.',
    deliverables: [
      'Campaign Social Carousels',
      'Always-On Product Posts',
      'Festive & Seasonal Giveaways',
      'Partner & Retail Notices',
    ],
    outcome:
      'Maintained fast-turnaround social delivery across OPPO and Singtel while preserving each brand’s visual consistency across seasonal campaigns and everyday content.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'social-1',
        image: '/assets/aistudio/Socal_1_8f3299e7.jpg',
        caption: '01 / OPPO Happy 58th Birthday Singapore social carousel & portrait story',
        alt: 'OPPO Reno10 Series Singapore 58th National Day Instagram carousel and portrait tiles',
        tag: 'OPPO · National Day',
      },
      {
        id: 'social-2',
        image: '/assets/aistudio/Socal_2_7496653a.jpg',
        caption: '02 / OPPO Ollie Singapore landmarks & cultural storytelling social series',
        alt: 'OPPO Ollie mascot photography series across Chinese Garden, Arab Street, and Marina Bay',
        tag: 'OPPO · Always-On SG',
      },
      {
        id: 'social-3',
        image: '/assets/aistudio/Socal_3_07fa58b3.jpg',
        caption: '03 / Always-on product flatlays for Pad Air Purple, Find N2 Flip & merchandise',
        alt: 'Instagram flatlays for OPPO Pad Air Purple, Find N2 Flip floral styling, and trial campaign',
        tag: 'OPPO · Product Showcase',
      },
      {
        id: 'social-4',
        image: '/assets/aistudio/Socal_4_b2e887dd.jpg',
        caption: '04 / OPPO Christmas Advent Calendar & D-1 to D-12 Answer To Win social cards',
        alt: 'OPPO Christmas Advent Calendar Instagram post and six Answer To Win giveaway tiles',
        tag: 'OPPO · Advent Calendar',
      },
      {
        id: 'social-5',
        image: '/assets/aistudio/Socal_5_a43cae71.jpg',
        caption: '05 / Always-on operational notices & Westgate Service Center launch post',
        alt: 'OPPO Novena Square notice and Westgate Service Center opening social announcement',
        tag: 'OPPO · Service Notices',
      },
      {
        id: 'social-6',
        image: '/assets/aistudio/Socal_6_cf849a61.jpg',
        caption: '06 / GrabPay Exclusive & My OPPO O-Fans IoT / Reno11 Series voucher tiles',
        alt: 'OPPO GrabPay $20 Exclusive and My OPPO O-Fans Exclusive IoT and Reno11 voucher posts',
        tag: 'OPPO · Partner Deals',
      },
      {
        id: 'social-7',
        image: '/assets/aistudio/Socal_7_0e99ca18.jpg',
        caption: '07 / Singtel Mother’s Day GODIVA & PS5 giveaway social feed and story set',
        alt: 'Singtel x GODIVA Mother’s Day social campaign with PS5 Slim Digital giveaway cards',
        tag: 'Singtel × GODIVA',
      },
      {
        id: 'social-8',
        image: '/assets/aistudio/Socal_8_9c4287f5.jpg',
        caption: '08 / Singtel 11.11 mega sale social carousel across AirPods, iPhone 16 & Pixel 9',
        alt: 'Singtel 11.11 Instagram campaign featuring AirPods Pro 2, $200 voucher, iPhone 16, Pixel 9, and Find N3 Series',
        tag: 'Singtel · 11.11 Sale',
      },
      {
        id: 'social-9',
        image: '/assets/aistudio/Socal_9_5f867722.jpg',
        caption: '09 / Singtel 10–14 Dec Online Flash Sale torn-paper social carousel creatives',
        alt: 'Singtel Online Flash Sale 10-14 Dec Instagram post and Apple Watch Ultra 3, Wi-Fi 7, iPhone 17 Pro Max tiles',
        tag: 'Singtel · Flash Sale Social',
      },
    ],
  },
  {
    id: 'digital-experience-apps',
    index: '05',
    title: 'Multi-App Digital Experience',
    subtitle: 'In-App Campaign Adaptation & Screen Systems',
    client: 'MySingtel, My OPPO & Partner Apps',
    year: '2023 – 2026',
    origin: 'OPPO & Singtel',
    slotStatus: 'Case Study',
    category: 'Digital Experience',
    tags: [
      'In-App Experience',
      'Project & Campaign Systems',
      'Key Visual System',
    ],
    excerpt:
      'Translating approved campaign directions into consistent in-app digital experiences, screens, and feature flows across multiple app environments.',
    overview:
      'Worked across multiple app environments, translating approved campaign directions into consistent digital experiences across different product contexts. Coordinated design adaptations from final approval through to in-app execution, balancing brand requirements, platform constraints, and existing design system standards. Also supported the development of new screens and feature experiences where required.',
    deliverables: [
      'In-App Campaign Placements',
      'Cross-App Screen Adaptations',
      'Design System Alignment',
      'New Feature UI Support',
    ],
    outcome:
      'Delivered cohesive in-app user journeys and campaign placements across MySingtel, My OPPO, and partner app ecosystems while maintaining design system standards.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'dp-1',
        image: '/assets/aistudio/DP_1_e4690b3a.jpg',
        caption: '01 / My OPPO device-binding & purchase rewards feature screens across multi-ratio slots',
        alt: 'My OPPO in-app feature screens and cards for Bind Your Smartphone and IoT Devices',
        tag: 'My OPPO · Feature Flow',
      },
      {
        id: 'dp-2',
        image: '/assets/aistudio/DP_1-1_aae8c3d8.jpg',
        caption: '02 / iCondo × Singtel partner in-app promo & Surprise Dad (FATHERS60) placement',
        alt: 'iCondo and Singtel mobile app voucher screen paired with Surprise Dad online exclusive banners',
        tag: 'Partner App Integration',
      },
      {
        id: 'dp-3',
        image: '/assets/aistudio/DP_1-2_28ab0227.jpg',
        caption: '03 / MySingtel App end-to-end flow: push alert, Top Picks, Shop Hot Deals & inbox UI',
        alt: 'Four mobile screens showing MySingtel push notification, Top Picks, Shop Hot Deals, and inbox message',
        tag: 'MySingtel App · 4-Screen Flow',
      },
      {
        id: 'dp-4',
        image: '/assets/aistudio/DP_1-3_443465b4.jpg',
        caption: '04 / My OPPO community, lucky draw & seasonal in-app loyalty banner system',
        alt: 'Six My OPPO in-app banners including Find N2 Flip Consumer Trial, Lucky Draw, Yoga Class, and NDP selfie campaign',
        tag: 'My OPPO · Loyalty Suite',
      },
    ],
  },
  {
    id: 'singtel-mothers-day-campaign',
    index: '06',
    title: "Mother's Day O2O Campaign",
    subtitle: 'Key Visual Lead · Offline Brochure, Microsite & MySingtel App',
    client: 'Singtel × GODIVA · Print, Microsite & App',
    year: '2024',
    origin: 'Singtel',
    slotStatus: 'Case Study',
    category: 'Brand & Localization',
    tags: [
      'Key Visual System',
      'Microsite',
      'In-App Experience',
      'Social Engagement',
    ],
    excerpt:
      'Key visual lead for Singtel’s Mother’s Day campaign bridging offline QR brochures to the online redemption microsite, MySingtel App, and social.',
    overview:
      'Led key visual direction for Singtel’s dedicated Mother’s Day campaign in partnership with GODIVA and Singaporean artist Kelly Ser. Built a cohesive visual system connecting offline in-store brochures with QR touchpoints directly into the online campaign microsite, alongside MySingtel App placements, Inbox alerts, and event social assets.',
    deliverables: [
      'Campaign Key Visual System',
      'Offline Print & QR Brochure',
      'Online Redemption Microsite',
      'MySingtel App & Social Cards',
    ],
    outcome:
      'Connected offline retail touchpoints and online microsite redemption journeys under one unified Mother’s Day visual identity across print, web, app, and social.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'md-1',
        image: '/assets/aistudio/M_1-3_de871fc7.jpg',
        caption: '01 / Dedicated online redemption microsite & digital contest entry page on singtel.com',
        alt: 'Laptop showing Singtel online campaign microsite for free GODIVA gift redemption and PS5 contest form',
        tag: 'Online Microsite',
      },
      {
        id: 'md-2',
        image: '/assets/aistudio/M_1_9c78b5c1.jpg',
        caption: '02 / In-store offline brochures linking customers via QR to GODIVA treats & MySingtel Rewards',
        alt: 'Singtel Mother’s Day offline print brochures with QR codes for GODIVA treats and limited edition reusable bag',
        tag: 'Offline Brochure & QR',
      },
      {
        id: 'md-3',
        image: '/assets/aistudio/M_1-1_f8b5587c.jpg',
        caption: '03 / Primary campaign key visual cards for digital form submissions, Private Sale & GODIVA redemption',
        alt: 'Four Singtel x GODIVA Mother’s Day campaign social and key visual cards featuring PS5 giveaway and treats',
        tag: 'Key Visual & Social',
      },
      {
        id: 'md-4',
        image: '/assets/aistudio/M_1-2_f924eb59.jpg',
        caption: '04 / In-app campaign integration across Shop Deals, Inbox notifications, Home & Rewards',
        alt: 'Four MySingtel App screens showing Mother’s Day GODIVA banner, Inbox message, Home What’s New, and Rewards bag',
        tag: 'MySingtel App Rollout',
      },
    ],
  },
  {
    id: 'responsive-edm-mjml',
    index: '07',
    title: 'Responsive EDM & Newsletter Systems',
    subtitle: 'MJML Production, Mastheads & Client Rendering',
    client: 'Singtel, GOMO & OPPO · CRM & Email',
    year: '2023 – 2026',
    origin: 'OPPO & Singtel',
    slotStatus: 'Case Study',
    category: 'Workflow & Templates',
    tags: [
      'Email & eDM Design',
      'Project & Campaign Systems',
      'Key Visual System',
    ],
    excerpt:
      'Responsive MJML email systems, promotional mastheads, and ongoing newsletter communications engineered for cross-client rendering.',
    overview:
      'Designed and built responsive email creative using MJML, adapting campaign visual systems into email format for time-sensitive promotions, alongside producing consistent newsletter-style content for ongoing customer communication. Managed masthead production and design-to-dev handoff to ensure consistent rendering across email clients.',
    deliverables: [
      'MJML Email Templates',
      'Campaign Masthead Production',
      'Newsletter Layout Systems',
      'Design-to-Dev Handoff',
    ],
    outcome:
      'Standardized responsive EDM production across desktop and mobile mail clients while accelerating time-sensitive promotional campaign launches.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'edm-1',
        image: '/assets/aistudio/Edm_1_ba9f4b08.jpg',
        caption: '01 / Festive UNLIMITED 5G+ promotional eDM built in MJML with live mobile rendering',
        alt: 'Laptop showing MJML code editor beside desktop and mobile responsive preview of Singtel UNLIMITED 5G+ EDM',
        tag: 'MJML & Live Preview',
      },
      {
        id: 'edm-2',
        image: '/assets/aistudio/Edm_1-1_b8001465.jpg',
        caption: '02 / iPhone Duo PWP accessory voucher newsletter builder template in Mailchimp',
        alt: 'Mailchimp block editor showing Singtel PWPLater-IPHONEDUO promotional email masthead',
        tag: 'Modular Newsletter Block',
      },
      {
        id: 'edm-3',
        image: '/assets/aistudio/Edm_1-2_fee9b047.jpg',
        caption: '03 / Galaxy Z TriFold MJML markup alongside desktop and mobile client previews',
        alt: 'Singtel and Samsung Galaxy Z TriFold MJML source code paired with responsive desktop and mobile email views',
        tag: 'Singtel × Samsung EDM',
      },
      {
        id: 'edm-4',
        image: '/assets/aistudio/Edm_1-3_b22151da.jpg',
        caption: '04 / Full mobile eDM scrolls across OPPO Find N3, Singtel Best Price, GOMO & Galaxy Z TriFold',
        alt: 'Four full-length mobile email screens featuring OPPO Find N3 Series, Singtel Best Price Promise, GOMO Roaming, and Galaxy Z TriFold',
        tag: 'Cross-Brand EDM Suite',
      },
    ],
  },
  {
    id: 'retail-mall-brochures',
    index: '08',
    title: 'Retail Store, Mall & WhatsApp Brochures',
    subtitle: 'Offline Store Collateral, Mall Partnerships & Sales Support',
    client: 'OPPO & Singtel · Retail, Malls & WhatsApp',
    year: '2023 – 2026',
    origin: 'OPPO & Singtel',
    slotStatus: 'Case Study',
    category: 'Retail & Spatial',
    tags: [
      'Project & Campaign Systems',
      'Key Visual System',
      'Social Engagement',
    ],
    excerpt:
      'Print-to-digital brochures tailored for physical retail stores, shopping mall partnerships, corporate staff offers, and WhatsApp sales support.',
    overview:
      'Designed print and digital brochure suites supporting offline retail stores, co-branded shopping mall activations, and corporate partner programs across OPPO and Singtel. Structured scannable pricing tiers, installment breakdowns, and direct QR-to-WhatsApp chat touchpoints so frontline promoters and remote WhatsApp sales teams could guide inquiries and convert offline footfall smoothly.',
    deliverables: [
      'In-Store Product Brochures',
      'Mall Partner Collateral',
      'WhatsApp Sales Support Cards',
      'QR-to-Chat Conversion Flyers',
    ],
    outcome:
      'Equipped physical retail stores, mall partner booths, and WhatsApp sales support teams with clear, share-ready collateral bridging offline browsing to assisted checkout.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'brochure-1',
        image: '/assets/aistudio/B-1_11a833b6.jpg',
        caption: '01 / OPPO Employee Purchase Program flyers for corporate partners & in-store referrals',
        alt: 'OPPO Employee Purchase Program exclusive staff discount brochures across smartphones, tablets, and IoT',
        tag: 'Corporate & Store Flyers',
      },
      {
        id: 'brochure-2',
        image: '/assets/aistudio/B-1-1_a81cee5b.jpg',
        caption: '02 / OPPO × Takashimaya Gadget Galore mall partnership & O-Class Senior Go Digital QR flyer',
        alt: 'OPPO Takashimaya Gadget Galore 2023 cardholder offer beside O-Class Senior Go Digital QR brochure',
        tag: 'Mall & Community Flyers',
      },
      {
        id: 'brochure-3',
        image: '/assets/aistudio/B-1-2_be3cce98.jpg',
        caption: '03 / Singtel in-store Smart Living & productivity brochures featuring 0% installment plans',
        alt: 'Two Singtel offline store brochures: Smart Living Begins Here and Effortless Productivity All in One Bag',
        tag: 'Retail Store Collateral',
      },
      {
        id: 'brochure-4',
        image: '/assets/aistudio/B-1-3_3c45055d.jpg',
        caption: '04 / Singtel staff benefits & voucher flyers wired with QR codes to WhatsApp sales chat support',
        alt: 'Singtel exclusive staff benefits flyer with WhatsApp sales team QR code and From Work to Play store voucher',
        tag: 'WhatsApp Sales Support',
      },
    ],
  },
  {
    id: 'ecom-store-setup',
    index: '09',
    title: 'LazMall E-Commerce Store Setup',
    subtitle: 'Flagship Storefront Architecture, Launch & Product Banners',
    client: 'Singtel · LazMall Official Store',
    year: '2024 – 2025',
    origin: 'Singtel',
    slotStatus: 'Case Study',
    category: 'Digital Experience',
    tags: [
      'Project & Campaign Systems',
      'Key Visual System',
      'Microsite',
    ],
    excerpt:
      'End-to-end visual setup and storefront module architecture for Singtel’s LazMall Flagship Store launch across desktop and mobile.',
    overview:
      'Supported the end-to-end visual setup and launch of Singtel’s LazMall Flagship Store across desktop and mobile shopping experiences. Designed and structured core storefront modules including flagship store headers, New Store Opening hero banners, voucher shelves, brand store showcases, and pre-order campaign banners for devices such as Galaxy Z Fold7 and HONOR Magic V5.',
    deliverables: [
      'LazMall Storefront Architecture',
      'New Store Opening Banners',
      'Voucher & Brand Modules',
      'Flagship Pre-Order Creatives',
    ],
    outcome:
      'Established a scalable LazMall Flagship Store layout system enabling rapid flagship pre-order updates and consistent marketplace conversion across desktop and mobile.',
    externalUrl: FIGMA_PROTOTYPE_URL,
    slides: [
      {
        id: 'ecom-1',
        image: '/assets/aistudio/P-1_f96d56f5.jpg',
        caption: '01 / Singtel LazMall Flagship Store desktop & mobile hero podium storefront setup',
        alt: 'Laptop and mobile mockups showing Singtel LazMall Flagship Store multi-device hero banner',
        tag: 'Desktop & Mobile Storefront',
      },
      {
        id: 'ecom-2',
        image: '/assets/aistudio/P-2_d55df1a6.jpg',
        caption: '02 / Flagship store header, New Store Opening $5 OFF hero & brand showcase module',
        alt: 'Laptop showing Singtel LazMall Official Storefront with New Store Opening banner and Samsung Official Store section',
        tag: 'Store Opening Launch',
      },
      {
        id: 'ecom-3',
        image: '/assets/aistudio/P-3_e28a24f1.jpg',
        caption: '03 / Mobile voucher shelf paired with Galaxy Z Fold7 & HONOR Magic V5 pre-order banners',
        alt: 'Mobile LazMall store layout with voucher strip alongside Galaxy Z Fold7 and HONOR Magic V5 pre-order banners',
        tag: 'Pre-Order & Voucher Grid',
      },
    ],
  },
];

export const SOCIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'linkedin.com/in/tranxy-chong',
    url: 'https://www.linkedin.com/in/tranxy-chong',
    role: 'Career Profile & Network',
    description:
      'Full professional timeline spanning Creative Technology at Singtel and Digital Design at OPPO in Singapore.',
    recentNote:
      'Current role: Creative Technology at Singtel (Feb 2024 – Present).',
    updatedAt: 'Active',
  },
  {
    id: 'figma',
    platform: 'Figma Portfolio',
    handle: 'Regional Digital Design Prototype',
    url: FIGMA_PROTOTYPE_URL,
    role: 'Interactive Prototype Archive',
    description:
      'Click through regional digital design work, workflow standardization systems, and responsive UI prototypes.',
    recentNote:
      'Includes interactive user flows, grid studies, and campaign templates.',
    updatedAt: 'Live Link',
  },
  {
    id: 'email',
    platform: 'Direct Email',
    handle: 'xjchong22@gmail.com',
    url: 'mailto:xjchong22@gmail.com',
    role: 'Opportunities & Collaborations',
    description:
      'Reach out directly regarding Digital Experience, Product Operations, or cross-functional design roles.',
    recentNote:
      'Direct channel for Digital Experience & Product Operations inquiries.',
    updatedAt: 'Preferred',
  },
  {
    id: 'whatsapp-phone',
    platform: 'Phone / WhatsApp',
    handle: '+65 85033386',
    url: 'tel:+6585033386',
    role: 'Singapore Direct Line',
    description:
      'Direct Singapore contact number for scheduled interviews, alignment calls, and project coordination.',
    recentNote:
      'Direct line and WhatsApp contact based in Singapore.',
    updatedAt: 'Singapore',
  },
  {
    id: 'behance',
    platform: 'Behance',
    handle: 'behance.net/tranxychong',
    url: 'https://www.behance.net',
    role: 'Visual Systems & Launches',
    description:
      'Curated visual guidelines, omnichannel campaign matrices, and retail launch execution showcases.',
    recentNote:
      'Featured study: Modular Flash Sale multi-channel template breakdown.',
    updatedAt: 'Curated',
  },
];
