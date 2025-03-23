export const commonStyles = {
  input: 'bg-white/5 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl focus:outline-none border border-white/10 focus:border-white/20 transition-colors',
  container: 'backdrop-blur-xl bg-white/5 rounded-2xl sm:rounded-3xl border border-white/10',
  gradientText: 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent',
  stickyBar: 'fixed bottom-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-t border-white/10 p-1'
};

export const spacing = {
  section: 'space-y-4 sm:space-y-6',
  container: 'p-4 sm:p-6',
  largeContainer: 'p-4 sm:p-8'
};

export const transitions = {
  default: 'transition-all duration-200',
  slow: 'transition-all duration-300',
  fast: 'transition-all duration-150'
}; 