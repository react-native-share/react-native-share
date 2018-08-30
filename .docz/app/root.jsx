import React from 'react'
import { hot } from 'react-hot-loader'
import Theme from 'docz-theme-default'
import db from './db.json'

const Root = ({ imports }) => (
  <Theme db={db} imports={imports} hashRouter={false} />
)

export default hot(module)(Root)
