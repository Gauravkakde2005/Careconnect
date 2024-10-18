import React from 'react'
// import { MainLayout } from '../../components/index.js'
import { Hero } from './container/Hero'
import Services from './container/Services'
import GettingStarted from './container/GettingStarted'
import MainLayout from '../components/MainLayout.jsx'

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <GettingStarted />
            <Services />
        </MainLayout>
    )
}

export default HomePage