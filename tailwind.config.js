module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'header-img': "url('./assets/suggestions/desktop/background-header.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
    colors:{
      'purple': '#AD1FEA',
      'blue': '#4661E6',
      'hover-blue': '#CFD7FF',
      'light-blue':'#62BCFA',
      'dark-blue':'#3A4374',
      'very-dark-blue':'#373F68',
      'grey':'#F2F4FF',
      'light-grey':'#F7F8FD',
      'dark-grey':'#647196',
      'orange':'#F49F85',
      'white':'#FFFFFF',
      'red':'#FF5A5F',
    
    }
  },
  plugins: [],
}

