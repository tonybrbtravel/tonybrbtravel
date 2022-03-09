import React from 'react'
import { Wrapper, Grid } from './styles'
import PressCard from '../../components/PressCard'

export const RelatedArticles = ({ articles, title }) => (
  <Wrapper>
    {!title && <h4>Continue Reading</h4>}
    {title && <h4>{title}</h4>}
    <Grid>
      {articles.map(article => (
        <PressCard key={article.node.id} article={article} />
      ))}
    </Grid>
  </Wrapper>
)

export default RelatedArticles
