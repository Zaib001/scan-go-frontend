// tailwind.config.js
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'pulse-word': 'pulse 1s ease-in-out',
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { backgroundColor: 'transparent' },
                    '50%': { backgroundColor: '#c7d2fe' }, // indigo-200
                },
            },
                colors: {
                    primary: '#009688',
                    secondary: '#64748B',
                    background: '#F3F4F6',
                    card: '#FFFFFF',
                    accent: '#10B981',
                },
                boxShadow: {
                    card: '0 10px 15px rgba(0, 0, 0, 0.1)',
                    button: '0 5px 10px rgba(0, 0, 0, 0.1)',
                },
                borderRadius: {
                    xl: '1rem',
                },
            },
        },
        plugins: [],
    }
