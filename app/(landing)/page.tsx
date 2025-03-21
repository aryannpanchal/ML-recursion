'use client'
import Hero from '@/components/Hero'
import Header from '@/components/Header'
import HeaderMobile from '@/components/HeaderMobile'

const landingPage = () => {



    return(
        <div>
              {/* Navbar */}
              <Header />
              <HeaderMobile />
              <Hero />


        
        </div>
    )
  }


export default landingPage;