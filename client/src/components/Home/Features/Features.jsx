import React from 'react'
import FeatureCard from './FeatureCard';

const features = [
    {
        header: 'Header',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus rerum similique aspernatur cum voluptas.'
    },
    {
        header: 'Header',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus rerum similique aspernatur cum voluptas.'
    },
    {
        header: 'Header',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus rerum similique aspernatur cum voluptas.'
    },
    {
        header: 'Header',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus rerum similique aspernatur cum voluptas.'
    },
]

const Features = () => {
    return (
        <div className='py-8 px-12 sm:py-16 sm:px-24'>
            <div className=''>
                <h2 className='text-3xl font-semibold text-white'>Features</h2>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-x-6 text-white mt-6'>
                {
                    features.map((feature, index) => {
                        return (
                            <FeatureCard
                                header={feature.header}
                                description={feature.description}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Features;
