import React, { lazy } from 'react'

const CardMedia = lazy(() => import('@material-ui/core/CardMedia'))

export default function PostMedia(props) {
    return (
        <CardMedia
          className="css-js-media"
          { ...props }
        />
    )
}
