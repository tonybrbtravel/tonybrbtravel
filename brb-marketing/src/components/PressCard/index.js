import React from 'react'
import { Wrapper, Title, Byline, ImgContainer } from './styles'

export const ArticleCard = ({ article }) => (
  <Wrapper href={article.node.articleLink} target="_blank">
    <div>
      <ImgContainer>
        <img
          src={`${article.node.coverImage.file.url}?&w=400`}
          alt={article.node.title}
          title={article.node.coverImage.title}
        />
      </ImgContainer>
      <Title>{article.node.articleQuote}</Title>
    </div>
    <Byline>
      <img
        src={article.node.publicationLogo.file.url}
        title={article.node.publicationLogo.title}
        alt={article.node.publicationLogo.title}
      />
    </Byline>
  </Wrapper>
)

export default ArticleCard
