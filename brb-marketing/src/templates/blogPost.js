import React, { useEffect } from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import RelatedArticles from '../components/RelatedArticles'
import readingTime from 'reading-time'
import {
  Wrapper,
  TitleBar,
  ShareButton,
  ArticleImage,
  Article,
} from '../components/BlogPostStyles'

import facebookIcon from '../images/social-facebook.svg'
import twitterIcon from '../images/social-twitter.svg'

const shouldBeCompact = (list) => {
  // Returns true only if all list items contain only a single <a>.
  // e.g. the "48 hours in X" links at the bottom of many posts
  for ( let i = 0; i < list.children.length; i++) {
    const item = list.children[i];
    if (item.children.length > 1) return false;
    if (item.firstChild.tagName !== 'A') return false;
  }
  return true;
}

const ListHelper = () => {
  useEffect(() => {
    // Add a class to aid the display of unordered lists containing only links
    document.querySelectorAll(Article.toString() + ' ul').forEach((list) => {
      if (shouldBeCompact(list)) { list.classList.add('compact'); }
    });
  }, []);
  return null;
};

const blogPost = ({ pageContext }) => {

  const {
    title,
    tags,
    subtitle,
    article,
    heroImage,
    slug,
    relatedArticles,
  } = pageContext

  const path = `https://berightback.travel/articles/${slug}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${path}`
  const twUrl = `https://twitter.com/share?text=${title} by @travelbrb&url=${path}`
  const readTime = readingTime(article)

  return (
    <Layout>
      <Wrapper>
        <Helmet>
          <title>{title}</title>
          <meta keywords={tags} />
          <meta description={subtitle} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@travelbrb" />
          <meta name="twitter:creator" content="@travelbrb" />
          <meta property="og:title" content={title} />
          <meta property="og:type" content="article" />
          <meta property="og:description" content={subtitle} />
          <meta property="og:url" content={path} />
          <meta property="og:image" content={'https:' + heroImage.file.url} />
        </Helmet>
          <TitleBar>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <ShareButton href={fbUrl} target="_blank" rel="noopen noreferrer">
              <span>Share</span>
              <img src={facebookIcon} alt="Facebook logo" />
            </ShareButton>
            <ShareButton
              href={twUrl}
              target="_blank"
              rel="noopen noreferrer"
              twitter
            >
              <span>Tweet</span>
              <img src={twitterIcon} alt="Twitter logo" />
            </ShareButton>
            <p>{readTime.text}</p>
          </TitleBar>
          <ArticleImage src={`${heroImage.file.url}?&w=800`} alt={heroImage.description} />
          <Article
            dangerouslySetInnerHTML={{
              __html: article,
            }}
          />
          <ListHelper />
      </Wrapper>
      {relatedArticles.length > 1 && <RelatedArticles articles={relatedArticles} />}
    </Layout>
  )
}

export default blogPost
