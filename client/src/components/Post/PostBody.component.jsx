import React, { lazy } from 'react'

const CardContent = lazy(() => import('@material-ui/core/CardContent'))
const Typography = lazy(() => import('@material-ui/core/Typography'))

export default function PostBody({ body }) {
    return (
        <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {body}
        </Typography>
      </CardContent>
    )
}
