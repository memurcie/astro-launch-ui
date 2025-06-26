import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import matter from 'gray-matter';

export const post = async ({ request }) => {
  try {
    // Verify the request method
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse the request body
    const data = await request.json();
    const { title, content, author = 'AgenixHub Team', tags = [] } = data;

    // Validate required fields
    if (!title || !content) {
      return new Response(JSON.stringify({ error: 'Title and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create blog post metadata
    const postId = uuidv4();
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');

    const frontmatter = {
      title,
      pubDate: new Date().toISOString(),
      description: content.substring(0, 160) + '...',
      author,
      tags,
      draft: false,
      layout: '../../layouts/BlogPost.astro',
    };

    // Create the markdown content with frontmatter
    const markdownContent = matter.stringify(content, frontmatter);

    // Define the file path
    const postsDir = path.join(process.cwd(), 'src/content/blog');
    const filePath = path.join(postsDir, `${slug}.md`);

    // Create the posts directory if it doesn't exist
    if (!fs.existsSync(postsDir)) {
      fs.mkdirSync(postsDir, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, markdownContent);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Blog post created successfully',
        data: {
          id: postId,
          slug,
          path: `/blog/${slug}`,
        },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// For Astro API routes, we need to handle different HTTP methods
export const all = async ({ request }) => {
  if (request.method === 'POST') {
    return post({ request });
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
};
