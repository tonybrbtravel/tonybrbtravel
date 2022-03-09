import React from 'react'
import moment from 'moment'
import { Wrapper, Title, Description, Byline, ImgContainer } from './styles'

export const ArticleCard = ({ article }) => (
  <Wrapper className="simple-animate-in" to={`/articles/${article.node.slug}/`}>
    <ImgContainer>
      <img
        src={`${article.node.heroImage.file.url}?&w=400`}
        alt={article.node.heroImage.description}
      />
    </ImgContainer>
    <Title>{article.node.title}</Title>
    <Description>{article.node.shortDescription}</Description>
    <Byline>
      {article.node.author} /{' '}
      <span>{moment(article.node.createdAt).format('DD.MM.YY')}</span>
    </Byline>
  </Wrapper>
)

export default ArticleCard
