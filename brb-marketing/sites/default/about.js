import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components';

import Layout from '../../src/components/layout'
import H2 from '../../src/components/H2'
import SubText from '../../src/components/SubText'

import homeHeroStatic from '../../src/images/homeHero.jpg'
import Metrics from '../../src/themes/Metrics'
import Spacer from '../../src/components/Spacer'

const Wrapper = styled.div`
    font-size: 18px;
    line-height: 1.5em;
    width: 100%;
    padding: 20px;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;

    h1 {
        font-size: 64px;
        text-align: center;
        line-height: 1em;
        letter-spacing: -3px;
    }

    h2 {
        font-size: 32px;
        letter-spacing: -0.5px;
        margin: 1em 0;
    }

    img {
        width: 120%;
        margin: 30px 0 30px -40px;
    }
`;

const Job = styled.div`
    width: 100%;
    max-width: 720px;
    padding: 30px 0 6px 0;
    border-radius: 6px;
    box-shadow: 0 0 20px rgba(0,0,0,0.05);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;

    h3 {
        padding: 0 30px;
        margin: 0 0 1em 0;
        font-size: 24px;
    }

    p {
        font-size: 16px;
        line-height: 1.8em;
        opacity: 0.5;
        margin: 0 0 12px 0;
        padding: 0 30px;

        &.soon {
            opacity: 0.3;
            font-size: 18px;
        }
    }

    hr {
        border: none;
        border-bottom: 1px solid #F0F1F6;
        margin: 24px 0 16px 0;
    }

    a {
        display: block;
        color: #FF0053;
        margin: 0 0 12px 0;
        padding: 0 30px;
        font-size: 18px;
    }
`;

class AboutPage extends React.PureComponent {
    render() {
        const data = this.props.data.allContentfulPage.nodes[0]

        return (
        <Layout>
            <Helmet>
            <title>
                BeRightBack - Discover Europe One Surprise Destination at a Time
            </title>
            <meta
                name="description"
                content="BRB is the world's first travel subscription service. Pay monthly and get a break in Europe every 4 months to a surprise destination."
            />
            <meta
                name="keywords"
                content="travel, be right back, brb, BRB, surprise, europe, holidays, subscription, flights, accommodation, hotel, app, travel agent"
            />
            <meta name="robots" content="index, follow" />
            <meta property="og:type" content="product" />
            <meta
                property="og:title"
                content="BRB: The world's first travel subscription"
            />
            <meta property="og:url" content="https://berightback.travel" />
            <meta property="og:image" content={homeHeroStatic} />
            </Helmet>
            <Wrapper>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.body.childMarkdownRemark.html,
                    }}
                />
            </Wrapper>
            <div style={{ height: '1px', backgroundColor: '#F0F1F6', margin: '60px 0' }} />
            {data.pageSection.map((section) => (
                <div key={section.title}>
                    <H2>{section.title}</H2>
                    <SubText style={{ opacity: '0.5' }}>{section.introduction.childMarkdownRemark.rawMarkdownBody}</SubText>
                    <Spacer height={Metrics.smallSpacer} />
                    {section.objects.map((job) => (
                        <Job key={job.jobTitle}>
                            <h3>{job.jobTitle}</h3>
                            <p>{job.shortDescription.childMarkdownRemark.rawMarkdownBody}</p>
                            <hr />
                            {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer">Apply now →</a>}
                            {!job.link && <p className="soon" href={job.link} target="_blank">Hiring soon</p>}
                        </Job>
                    ))}
                </div>
            ))}
            <Wrapper>
                <h3 style={{ textAlign: 'center', margin: 0 }}>Can't see your perfect role?</h3>
                <p style={{ textAlign: 'center', opacity: '0.5', margin: 0}}>Drop your CV and tell us a bit about you to <a href="mailto:hello@berightback.travel">hello@berightback.travel</a> and we&apos;ll get back to you if something comes up!</p>
            </Wrapper>
            <Spacer height={Metrics.bigSpacer} />
        </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
    query MyQuery {
        allContentfulPage(filter: {slug: {eq: "about"}}) {
        nodes {
            pageSection {
                title
                introduction {
                    childMarkdownRemark {
                      rawMarkdownBody
                    }
                }
                objects {
                    ... on ContentfulJob {
                        id
                        jobTitle
                        link
                        shortDescription {
                            childMarkdownRemark {
                                rawMarkdownBody
                            }
                        }
                    }
                    ... on ContentfulTeamMember {
                        id
                        name
                        jobTitle
                        photo {
                        file {
                            url
                        }
                    }
                }
            }
            childContentfulPageSectionIntroductionTextNode {
                childMarkdownRemark {
                html
                }
            }
            }
            headline
            body {
            childMarkdownRemark {
                html
            }
            }
        }
        }
    }
`
