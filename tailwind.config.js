/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				sidebarBackground: '#282A3C', // Fix the typo here
				main: '#F2F3F8',
				seprator: '#CAC4D0',
				blue: '#009DFF',
				blue_5: '#5867DD',
				gray_10: '#575962',
				gray_20: '#F4F5F8',
				gray_30: '#868AA8',
				headerTitle: '#575962',
				blue_10: '#5867DD12',
				blue_1: '#5867DD',
				checkBox: '#E2E5EC',
				content: '#FFFFFF',
				gray_40: '#F5F5F5',
				gray_45: '#575962',
				yellow_5: '#FFB822',
				red_5: '#F4516C',
				black_5: '#575962',
				colorTextSidbar: '#023338',
				MainColor: '#EBEDF2',
				puple_1: '#3D3B56',
				green_1: '#48AE8B',
				overlayBack: 'rgba(139,137,154,0.5)',
				boderFileUploader:'#979797',
				HoverTreeItem : 'rgba(235, 237, 241, 0.9)',
				errorInput:'#FCD0D7',
				gray_5:'#EEE',
				blue_2:'#CDEEFE',
				blue_3:'#0088cc'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};