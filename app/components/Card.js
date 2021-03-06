import React from 'react'
import propTypes from 'prop-types'
import { ThemeConsumer } from '../context/theme'

export default function Card ({ header, subHeader, avatar, href, name, children}) {
    return (
        <ThemeConsumer>
            {({ theme })=>(
                <div className={`card bg-${theme}`}>
                    <h4 className='header-lg center-text'>
                        {header}
                    </h4>
                    <img
                        className='avatar'
                        src={avatar}
                        alt={`Avatar for ${name}`}
                    />
                    {subHeader && (
                    <h4 className='center-text'>
                        {subHeader}
                    </h4>
                    )}
                    <h2 className='center-text'>
                        <a className='link' href={href}>
                            {name}
                        </a>
                    </h2>
                    {children}
                </div>
            )}
        </ThemeConsumer>
    )
}

Card.propTypes = {
    header: propTypes.string.isRequired,
    subHeader: propTypes.string,
    avatar: propTypes.string.isRequired,
    href: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
}