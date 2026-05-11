export const tokens = {
    colors: {
        bg: {
            background: 'var(--bg-background)', // Found via `bg-background`
            black: '#000000', // Found via `bg-black`
            blackTransparent: 'rgba(0, 0, 0, 0.6)', // Found via `bg-black/60`
            white: '#FFFFFF', // Found via `bg-white`
            transparent: 'transparent',
            card: 'rgba(28, 28, 28, 0.44)', // Found via `bg-[#1C1C1C70]`
            slate: {
                2: 'var(--slate-2)', // Elements like `bg-slate-2`
                4: 'var(--slate-4)', // `bg-slate-4`
                5: 'var(--slate-5)', // `hover:bg-slate-5`
                6: 'var(--slate-6)', // `bg-slate-6`
            },
            states: {
                success: 'var(--green-500)', // `bg-green-500`, `bg-green-3`, `bg-green-10`
                error: 'var(--red-3)', // `bg-red-3`, `bg-red-10`
                warning: 'var(--yellow-3)', // `bg-yellow-3`, `bg-yellow-10`
                info: 'var(--blue-3)', // `bg-blue-3`
                violet: 'var(--violet-3)', // `bg-violet-3`
            }
        },
        text: {
            primary: '#FFFFFF', // `text-white`, `hover:text-white`
            secondary: 'var(--gray-10)', // `text-gray-10`, `hover:text-gray-10`
            muted: 'var(--gray-9)', // `text-gray-9`
            subtle: '#70757E', // `text-[#70757E]`
            dark: '#464A4D', // `text-[#464A4D]`
            slate: {
                10: 'var(--slate-10)', // `text-slate-10`
                11: 'var(--slate-11)', // `text-slate-11`
                12: 'var(--slate-12)', // `text-slate-12`, `hover:text-slate-12`
            },
            states: {
                success: 'var(--green-11)', // `text-green-11`
                error: 'var(--red-11)', // `text-red-11`
                warning: 'var(--yellow-11)', // `text-yellow-11`
                info: 'var(--blue-11)', // `text-blue-11`
                violet: 'var(--violet-11)' // `text-violet-11`
            }
        },
        accent: {
            primary: '#FFFFFF', // Typically text highlights are white `selection:text-white`
            hover: 'rgba(255, 255, 255, 0.9)', // `focus-visible:bg-white/90`, `hover:bg-white/90`
            glowTextVariant: '#A1FCEA', // `text-[#A1FCEA]` found in active tabs
        },
        border: {
            default: 'var(--slate-6)', // `border-slate-6`
            light: 'rgba(255, 255, 255, 0.05)', // `border-white/5`
            grayA3: 'var(--gray-a3)', // `border-gray-a3`
            dark: '#262A2D', // `border-[#262A2D]`
            cardHover: '#373737', // `hover:border-[#373737]`
            transparent: 'transparent'
        },
        gradients: {
            glowLine: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0) 0%, rgba(143,143,143,0.67) 50%, rgba(0,0,0,0) 100%)', // Hardcoded inline style in HTML
            glowConic: 'conic-gradient(from 90deg at 50% 50%, #00000000 50%, #000 50%)', // Hardcoded inline style in HTML
            glowRadial: 'radial-gradient(rgba(200,200,200,0.1) 0%, transparent 80%)', // Hardcoded inline style in HTML
            textGlowGradient: {
                start: '#E131F3', // `from-[#E131F3]`
                via: '#59B2EA', // `via-[#59B2EA]`
                end: '#A7FC8F' // `to-[#A7FC8F]`
            },
            buttonBgMap: 'linear-gradient(104deg, rgba(253,253,253,0.05) 5%, rgba(240,240,228,0.1) 100%)', // Button background `bg-[linear-gradient(...)]`
            cardHoverGlow: 'radial-gradient(142% 172% at 116% -36%, rgba(0,0,0,0) 0%, rgba(72,72,72,0.40) 100%), rgba(18,18,18,0.76)' // Card subtle glow
        }
    },
    typography: {
        fontFamily: {
            sans: "'Inter', system-ui, sans-serif", // `font-sans` with variable `inter_5ab5...`
            display: "'Domaine', serif", // `font-display`, `font-domaine` with variable `domaine_969...`
            mono: "'CommitMono', monospace", // `font-mono` with variable `commitmono_b69...`
        },
        fontSize: {
            hero: '6rem', // `text-[6rem]`
            displayLarge: '4.8rem', // `text-[4.8rem]`
            display: '4rem', // `text-[4rem]`
            h1: '3.5rem', // `text-[3.5rem]`
            h2: '3rem', // `text-[3rem]`
            h3: '1.5rem', // `text-[1.5rem]`
            xl: '1.25rem', // Tailwind standard `text-xl`
            baseLarge: '1.125rem', // `text-[1.125rem]`
            body: '1rem', // Tailwind standard `text-base`
            small: '0.875rem', // Tailwind standard `text-sm`
            caption: '0.75rem', // Tailwind standard `text-xs`
        },
        fontWeight: {
            light: 300, // `font-light`
            regular: 400, // `font-normal`
            medium: 500, // `font-medium`
            semibold: 600, // `font-semibold`
        },
        letterSpacing: {
            tight: '-0.01em', // `tracking-[-0.01em]`
            tighter: 'var(--tracking-tighter)', // `tracking-tighter`
            snug: '0.0125rem', // `tracking-[.0125rem]`
            wide: 'var(--tracking-wide)', // `tracking-wide`
        },
        lineHeight: {
            zero: 0, // `leading-[0]`
            none: 1, // `leading-none`
            tight: 1, // `leading-[100%]`
            snug: 1.2, // `leading-[120%]`
            normal: 1.3, // `leading-[130%]`
            relaxed: 1.5, // `leading-[1.5]`
            loose: 1.6, // `leading-[1.6]`
            px24: '24px', // `leading-[24px]`
            px32: '32px', // `leading-[32px]`
        }
    },
    spacing: {
        padding: {
            buttonY: '0px', // `py-0` with explicit heights `h-10`, `h-12` used instead of py
            buttonX: '1.25rem', // `px-5`
            cardY: '1.25rem', // `p-5`
            cardX: '1.25rem', // `p-5`
            sectionY: '3rem', // `py-12`
            sectionYLarge: '6rem', // `sm:py-24`
            containerX: '1.5rem', // `px-6`
        },
        gap: {
            tight: '0.5rem', // `gap-2`
            base: '1rem', // `gap-4`
            medium: '1.25rem', // `gap-5`
            large: '3rem', // `gap-12`
            xl: '4rem', // `gap-16`
            xxl: '5rem', // `gap-20`
        },
        heights: {
            buttonSmall: '2.5rem', // `h-10`
            buttonBase: '3rem', // `h-12`
            buttonLarge: '3.5rem', // `h-14`
            header: '58px', // `h-[58px]`
        }
    },
    radius: {
        sm: '0.125rem', // `rounded-sm`
        md: '0.375rem', // `rounded-md`
        lg: '0.5rem', // `rounded-lg`
        xl: '0.75rem', // `rounded-xl`
        '2xl': '1rem', // `rounded-2xl`
        '3xl': '1.5rem', // `rounded-3xl`
        full: '9999px', // `rounded-full`
        customCard: 'calc(1rem - 2px)', // `rounded-[calc(1rem-2px)]`
        customBadge: '0.25rem', // `rounded-[0.25rem]`
        customInput: '0.625rem', // `rounded-[0.625rem]`
    },
    shadow: {
        sm: 'var(--shadow-sm)', // `shadow-sm`
        insetLine: 'inset 0 0.0625rem 0.0625rem white', // `shadow-[inset_0_.0625rem_.0625rem_white]`
        cardElevation: '0 0.25rem 1.25rem 0.125rem rgba(0,0,0,0.18)', // `[box-shadow:0_.25rem_1.25rem_.125rem_rgba(0,0,0,.18)]`
    },
    animation: {
        duration: {
            fast: '150ms', // `duration-150`
            base: '200ms', // `duration-200`
            medium: '300ms', // `duration-300`
            slow: '500ms', // `duration-500`
        },
        easing: {
            base: 'var(--ease-in-out)', // `ease-in-out`
            in: 'var(--ease-in)', // `ease-in`
            out: 'var(--ease-out)', // `ease-out`
            linear: 'var(--ease-linear)', // `ease-linear`
            spring: 'cubic-bezier(0.36, 0.66, 0.6, 1)', // `ease-[cubic-bezier(.36,.66,.6,1)]`
        },
        hover: {
            scale: 1.05, // `hover:scale-105`
            translateY: '-1rem', // `md:group-hover:translate-y-4` (-1rem assumed as visually up)
            opacity: 1, // `md:group-hover:opacity-100` starts from 0.4 up to 0.6 to 1
        }
    },
    grid: {
        maxWidth: {
            '3xl': '48rem', // `max-w-3xl`
            '5xl': '64rem', // `max-w-5xl`
            '7xl': '80rem', // `max-w-7xl`
            customCard: '30rem', // `w-[30rem]`
            customText: '520px', // `max-w-[520px]`
        },
        columns: {
            base: 1, // `grid-cols-1`
            sm: 2, // `sm:grid-cols-2`
            md: 3, // `sm:grid-cols-3`
            lg: 6, // `lg:grid-cols-6`
        },
        gap: '1rem', // `gap-4` inside logo blocks
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        }
    }
};
