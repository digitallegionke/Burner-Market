import * as React from "react";
import dynamic from 'next/dynamic';
import {
  extractPlasmicQueryData,
  ComponentRenderData,
  PlasmicRootProvider,
} from "@plasmicapp/loader-nextjs";
import type { GetStaticPaths, GetStaticProps } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import { PLASMIC } from "../plasmic-init";
import { Loading } from "../components/Loading";

// Dynamically import PlasmicComponent to reduce initial bundle size
const PlasmicComponent = dynamic(
  () => import("@plasmicapp/loader-nextjs").then((mod) => mod.PlasmicComponent),
  {
    loading: () => <Loading fullScreen size="large" />,
    ssr: true
  }
);

export default function PlasmicLoaderPage(props: {
  plasmicData?: ComponentRenderData;
  queryCache?: Record<string, unknown>;
}) {
  const { plasmicData, queryCache } = props;
  const router = useRouter();

  // Show loading state during static page generation
  if (router.isFallback) {
    return <Loading fullScreen size="large" />;
  }

  // Handle 404 errors
  if (!plasmicData || plasmicData.entryCompMetas.length === 0) {
    return <Error statusCode={404} />;
  }

  const pageMeta = plasmicData.entryCompMetas[0];

  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={plasmicData}
      prefetchedQueryData={queryCache}
      pageRoute={pageMeta.path}
      pageParams={pageMeta.params}
      pageQuery={router.query}
    >
      <PlasmicComponent component={pageMeta.displayName} />
    </PlasmicRootProvider>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { catchall } = context.params ?? {};
    const plasmicPath = typeof catchall === 'string' ? catchall : Array.isArray(catchall) ? `/${catchall.join('/')}` : '/';
    
    const plasmicData = await PLASMIC.maybeFetchComponentData(plasmicPath);
    
    if (!plasmicData) {
      return { 
        notFound: true // Return 404 page for non-Plasmic routes
      };
    }

    const pageMeta = plasmicData.entryCompMetas[0];
    
    // Cache the necessary data fetched for the page
    const queryCache = await extractPlasmicQueryData(
      <PlasmicRootProvider
        loader={PLASMIC}
        prefetchedData={plasmicData}
        pageRoute={pageMeta.path}
        pageParams={pageMeta.params}
      >
        <PlasmicComponent component={pageMeta.displayName} />
      </PlasmicRootProvider>
    );

    return { 
      props: { 
        plasmicData, 
        queryCache 
      }, 
      revalidate: 60 // ISR: Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { 
      notFound: true // Return 404 page on errors
    };
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const pageModules = await PLASMIC.fetchPages();
    
    // Only pre-render the most important pages at build time
    const importantPaths = pageModules
      .filter(mod => !mod.path.includes('new-page')) // Exclude new-page routes
      .map((mod) => ({
        params: {
          catchall: mod.path.substring(1).split("/"),
        },
      }));

    return {
      paths: importantPaths,
      fallback: true // Enable ISR for non-pre-rendered pages
    };
  } catch (error) {
    console.error('Error in getStaticPaths:', error);
    return {
      paths: [],
      fallback: true
    };
  }
}
