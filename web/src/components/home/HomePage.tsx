import ExamplesSection from './ExamplesSection';
import FeatureSection from './FeatureSection';
import HeroSection from './HeroSection';
import IconsSection from './IconsSection';
import QuickstartSection from './QuickstartSection';
import {
    customIcons,
    examples,
    features,
    parameters,
    quickstartExampleUrl,
} from './homeData';

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <FeatureSection features={features} />
            <ExamplesSection examples={examples} />
            <QuickstartSection
                parameters={parameters}
                exampleUrl={quickstartExampleUrl}
            />
            <IconsSection customIcons={customIcons} />
        </>
    );
}
