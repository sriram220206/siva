import { Mail, Github, Linkedin, User as UserIcon, BookOpen, FileText, Newspaper, Building2, IdCard, Phone, GraduationCap, Globe, Fingerprint } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

interface HeroProps {
    data: Record<string, string>;
    publicationStats?: {
        journals: number;
        conferences: number;
        books: number;
    };
    socialLinks?: {
        mail?: string;
        github?: string;
        linkedin?: string;
        orcid?: string;
        googleScholar?: string;
        scopus?: string;
    };
}

const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="m2 12h2" />
        <path d="m20 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
        <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8" />
    </svg>
);

const ThreeDBookStats: React.FC<{
    stats: {
        journals: number;
        conferences: number;
        books: number;
    };
    delay: number;
}> = ({ stats, delay }) => {
    const [page, setPage] = useState(0);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "10deg"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const xPct = (event.clientX - rect.left) / rect.width - 0.5;
        const yPct = (event.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const flipPage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPage((prev) => (prev + 1) % 4);
    };

    const faceStyle: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={flipPage}
            className="relative py-12 px-6 flex items-center justify-start perspective-2000 cursor-pointer group select-none"
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-48 h-64 shadow-2xl transition-all duration-500 ease-out"
            >
                {/* Book Spine */}
                <div
                    className="absolute left-0 top-0 w-8 h-full bg-blue-900 rounded-l-sm z-50"
                    style={{
                        transform: "translateX(-4px) rotateY(-90deg)",
                        transformOrigin: "left",
                        boxShadow: "inset -4px 0 10px rgba(0,0,0,0.5)"
                    }}
                ></div>

                {/* Back Cover (Bottom Layer) */}
                <div
                    className="absolute inset-0 bg-blue-950 rounded-sm"
                    style={{ transform: "translateZ(-20px)" }}
                ></div>

                {/* Base Page (Content: Books) - Underneath everything */}
                <div
                    className="absolute inset-[3px] bg-gradient-to-br from-white to-blue-50 border-r p-4 flex flex-col items-center justify-center text-center shadow-inner"
                    style={{ transform: "translateZ(-10px)" }}
                >
                    <BookOpen className="w-10 h-10 text-blue-600 mb-2" />
                    <p className="text-4xl font-black text-blue-900">{stats.books}</p>
                    <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Books</p>
                </div>

                {/* Sheet 2 (Content: Conferences) - Flips when page >= 3 */}
                <motion.div
                    animate={{ rotateY: page >= 3 ? -165 : 0 }}
                    transition={{ type: "spring", stiffness: 45, damping: 15 }}
                    className="absolute inset-[3px] origin-left"
                    style={{ transformStyle: "preserve-3d", zIndex: 30, transform: "translateZ(0px)" }}
                >
                    {/* Front Face: Conferences */}
                    <div className="bg-gradient-to-br from-white to-sky-50 border-r p-4 flex flex-col items-center justify-center text-center shadow-sm" style={faceStyle}>
                        <Newspaper className="w-10 h-10 text-blue-500 mb-2" />
                        <p className="text-4xl font-black text-blue-900">{stats.conferences}</p>
                        <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Conference</p>
                    </div>
                    {/* Back Face: Solid Blue Shade */}
                    <div className="bg-blue-50 border-l border-blue-100" style={{ ...faceStyle, transform: "rotateY(180deg)" }}></div>
                </motion.div>

                {/* Sheet 1 (Content: Journals) - Flips when page >= 2 */}
                <motion.div
                    animate={{ rotateY: page >= 2 ? -165 : 0 }}
                    transition={{ type: "spring", stiffness: 45, damping: 15 }}
                    className="absolute inset-[3px] origin-left"
                    style={{ transformStyle: "preserve-3d", zIndex: 40, transform: "translateZ(10px)" }}
                >
                    {/* Front Face: Journals */}
                    <div className="bg-gradient-to-br from-white to-sky-50 border-r p-4 flex flex-col items-center justify-center text-center shadow-sm" style={faceStyle}>
                        <FileText className="w-10 h-10 text-sky-500 mb-2" />
                        <p className="text-4xl font-black text-blue-900">{stats.journals}</p>
                        <p className="text-xs font-bold text-blue-600/70 uppercase tracking-widest">Journals</p>
                    </div>
                    {/* Back Face: Solid Blue Shade */}
                    <div className="bg-blue-50 border-l border-blue-100" style={{ ...faceStyle, transform: "rotateY(180deg)" }}></div>
                </motion.div>

                {/* Front Cover - Flips when page >= 1 */}
                <motion.div
                    animate={{ rotateY: page >= 1 ? -170 : 0 }}
                    transition={{ type: "spring", stiffness: 40, damping: 12 }}
                    className="absolute inset-0 origin-left"
                    style={{ transformStyle: "preserve-3d", zIndex: 50, transform: "translateZ(20px)" }}
                >
                    {/* Front Face: Premium Cover */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-sm shadow-xl flex flex-col items-center justify-center p-4 border-l-4 border-blue-400" style={faceStyle}>
                        <Sparkles className="w-12 h-12 text-blue-200/50 mx-auto mb-4" />
                        <div className="text-center">
                            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em]">Statistics</h4>
                            <div className="h-0.5 w-10 bg-blue-300/40 mx-auto mt-2"></div>
                            <p className="text-[10px] text-blue-100 font-bold mt-6 opacity-60 uppercase tracking-widest">Click to open</p>
                        </div>
                    </div>
                    {/* Back Face: Solid Blue Shade */}
                    <div className="bg-blue-50 border-l border-blue-100 rounded-sm" style={{ ...faceStyle, transform: "rotateY(180deg)" }}></div>
                </motion.div>

                {/* Overall Shine effect atop the book */}
                <div className="absolute inset-0 pointer-events-none rounded-sm bg-gradient-to-tr from-white/5 via-transparent to-white/10" style={{ transform: "translateZ(25px)" }}></div>
            </motion.div>
        </motion.div>
    );
};

export const Hero: React.FC<HeroProps> = ({ data, publicationStats, socialLinks }) => {
    const name = data['Full Name'] || 'Faculty Member';
    const designation = data['Designation'] || 'Designation';
    const dept = data['Department'] || '';
    const institution = data['Institution Name'];
    const employeeId = data['Employee ID'];
    const officialEmail = data['Official Email'];
    const phone = data['Phone Number'];
    const ensureProtocol = (link: string) => {
        if (!link || link === '#') return '#';
        if (link.startsWith('http://') || link.startsWith('https://')) return link;
        return `https://${link}`;
    };


    // For hrefs
    const githubLink = ensureProtocol(socialLinks?.github || '#');
    const linkedinLink = ensureProtocol(socialLinks?.linkedin || '#');

    // Handle ORCID ID or link
    let orcidLink = socialLinks?.orcid || '#';
    if (orcidLink !== '#' && !orcidLink.startsWith('http')) {
        orcidLink = `https://orcid.org/${orcidLink}`;
    }
    orcidLink = ensureProtocol(orcidLink);

    const scholarLink = ensureProtocol(socialLinks?.googleScholar || '#');
    const scopusLink = ensureProtocol(socialLinks?.scopus || '#');

    const getPhotoUrl = (url: string) => {
        if (!url) return '';

        // Handle various Google Drive URL formats
        if (url.includes('drive.google.com')) {
            let id = '';
            // Match /d/ID or /file/d/ID
            const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/);
            // Match id=ID
            const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/);

            if (dMatch && dMatch[1]) id = dMatch[1];
            else if (idMatch && idMatch[1]) id = idMatch[1];

            if (id) {
                // This is the most reliable "hotlink" format for Google Drive photos
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }
        return url;
    };

    const photo = getPhotoUrl(data['Profile Photo Link']);

    return (
        <section id="basicInfo" className="min-h-[85vh] relative flex flex-col md:flex-row items-center overflow-hidden mesh-gradient">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Left Content Column */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col space-y-6"
                >
                    {/* Badge */}


                    {/* Greeting */}
                    <motion.h3
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl font-semibold text-slate-600"
                    >
                        Hello, I'm
                    </motion.h3>

                    {/* Name - Single Line */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight truncate"
                    >
                        <span className="gradient-text">{name}</span>
                    </motion.h1>

                    {/* Designation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-1.5"
                    >
                        <p className="text-xl md:text-2xl font-bold text-slate-700">
                            {designation}
                        </p>
                        <p className="text-lg text-slate-500 font-medium">
                            {dept}
                        </p>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.52 }}
                        className="space-y-1.5 text-slate-600 font-medium text-15 md:text-base mt-2"
                    >
                        {institution && (
                            <div className="flex items-center gap-3">
                                <Building2 size={18} className="text-sky-600 shrink-0" />
                                <span>{institution}</span>
                            </div>
                        )}
                        {employeeId && (
                            <div className="flex items-center gap-3">
                                <IdCard size={18} className="text-sky-600 shrink-0" />
                                <span>ID: {employeeId}</span>
                            </div>
                        )}
                        {officialEmail && (
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-sky-600 shrink-0" />
                                <span>{officialEmail}</span>
                            </div>
                        )}
                        {phone && (
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-sky-600 shrink-0" />
                                <span>{phone}</span>
                            </div>
                        )}
                    </motion.div>



                    {/* Publication Analysis - Beside Name */}
                    {publicationStats && (publicationStats.journals > 0 || publicationStats.conferences > 0 || publicationStats.books > 0) && (
                        <div className="relative mt-2 -ml-8">
                            <ThreeDBookStats
                                stats={{
                                    journals: publicationStats.journals,
                                    conferences: publicationStats.conferences,
                                    books: publicationStats.books
                                }}
                                delay={0.6}
                            />
                        </div>
                    )}

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex gap-4"
                    >
                        {[
                            { icon: <Mail size={20} />, href: '#contact', color: 'from-sky-500 to-cyan-500', show: true, label: 'Email' },
                            { icon: <Github size={20} />, href: githubLink, color: 'from-gray-700 to-gray-900', show: githubLink !== '#', label: 'GitHub' },
                            { icon: <Linkedin size={20} />, href: linkedinLink, color: 'from-blue-600 to-blue-800', show: linkedinLink !== '#', label: 'LinkedIn' },
                            { icon: <Fingerprint size={20} />, href: orcidLink, color: 'from-green-500 to-emerald-600', show: orcidLink !== '#', label: 'ORCID' },
                            { icon: <GraduationCap size={20} />, href: scholarLink, color: 'from-blue-400 to-blue-600', show: scholarLink !== '#', label: 'Scholar' },
                            { icon: <Globe size={20} />, href: scopusLink, color: 'from-orange-500 to-red-600', show: scopusLink !== '#', label: 'Scopus' }
                        ].filter(s => s.show).map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                title={social.label}
                                target={social.href.startsWith('http') ? "_blank" : undefined}
                                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className="group relative w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-slate-700 hover:text-white transition-all duration-300 hover-lift overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                <span className="relative z-10">{social.icon}</span>
                            </a>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        href="#contact"
                        className="btn-premium px-8 py-4 rounded-2xl text-white font-bold text-lg w-fit"
                    >
                        Let's Connect
                    </motion.a>
                </motion.div>

                {/* Right Photo Column */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex items-center justify-center md:self-start md:justify-center md:mt-44"
                >
                    <div className="relative">
                        {/* Decorative Elements */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl opacity-20 blur-2xl"></div>

                        <div className="relative w-72 aspect-[3/4] rounded-3xl overflow-hidden glass-card hover-lift">
                            {photo ? (
                                <img
                                    src={photo}
                                    alt={name}
                                    className="w-full h-full object-cover object-center"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-white">
                                    <UserIcon size={96} className="opacity-50" />
                                    <span className="mt-4 opacity-50 font-semibold">No Photo Available</span>
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
