import React, { Suspense } from 'react'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import ProjectLayout from '../pages/ProjectLayout'
import Layout from '../components/layout/layout.jsx'
import ProjectDetials from '../pages/ProjectDetials.jsx'
import ContactPage from '../pages/Contact.jsx'
import Loader from '../components/UI/Loader.jsx'
import Member from '../pages/Member.jsx'
const ServicesPage = React.lazy(() => import('../pages/ServicesPage'))
const Projects = React.lazy(() => import('../pages/Projects'))
const ServiceDetails = React.lazy(() => import('../pages/ServiceDetails'))



const AppRoutes = () => {


    return (
        <>

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route element={<Layout />}>

                        <Route path='/' element={<Home />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path='/projectlayout' element={<ProjectLayout />} />
                        <Route path='/projectDetails/:id' element={<ProjectDetials />} />
                        <Route path='/services' element={<ServicesPage />} />
                        <Route path='/services/:subServiceId/:serviceId' element={<ServiceDetails />} />
                        <Route path='/team' element={<Member />} />
                        <Route path='/contact' element={<ContactPage />} />
                       

                        <Route path="*" element={<Home />} />
                    </Route>
                </Routes>
            </Suspense>



        </>
    )
}

export default AppRoutes