import React from 'react'
import { Wrapper, Grid } from './styles'
import ArticleCard from '../../components/ArticleCard'

export const RelatedArticles = ({ articles, title }) => (
  <Wrapper>
    {!title && <h4>Continue Reading</h4>}
    {title && <h4>{title}</h4>}
    <Grid>
      {articles.map(article => (
        <ArticleCard key={article.node.id} article={article} />
      ))}
    </Grid>
  </Wrapper>
)

export default RelatedArticles
