import { Navigate, useParams } from 'react-router-dom';
import { getPostBySlug } from '../../data/blogPosts';
import BlogPostLayout from './BlogPostLayout';
import AslTranslator from './posts/AslTranslator';
import MlbPredictor from './posts/MlbPredictor';
import DiscordBot from './posts/DiscordBot';
import VynelProposal from './posts/VynelProposal';

const CONTENT_MAP = {
  'asl-translator': AslTranslator,
  'mlb-predictor': MlbPredictor,
  'discord-bot': DiscordBot,
  'vynel-product-proposal': VynelProposal,
};

export default function BlogPost() {
  const { slug } = useParams();
  const meta = getPostBySlug(slug);
  const Content = CONTENT_MAP[slug];

  if (!meta || !Content) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <BlogPostLayout meta={meta}>
      <Content />
    </BlogPostLayout>
  );
}
