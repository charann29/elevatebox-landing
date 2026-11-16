import fs from "node:fs";
import path from "node:path";
import type { CmsPost } from "../../cms";
import p_ab_testing_small_traffic from "./ab-testing-small-traffic.json";
import p_accessibility_is_cheaper_early from "./accessibility-is-cheaper-early.json";
import p_ai_integration_existing_products from "./ai-integration-existing-products.json";
import p_api_design_that_ages_well from "./api-design-that-ages-well.json";
import p_app_maintenance_budget from "./app-maintenance-budget.json";
import p_app_store_rejections from "./app-store-rejections.json";
import p_building_for_bharat from "./building-for-bharat.json";
import p_choosing_a_database from "./choosing-a-database.json";
import p_choosing_a_development_partner from "./choosing-a-development-partner.json";
import p_choosing_analytics_tools from "./choosing-analytics-tools.json";
import p_choosing_cloud_provider from "./choosing-cloud-provider.json";
import p_code_review_that_helps from "./code-review-that-helps.json";
import p_content_seo_that_still_works from "./content-seo-that-still-works.json";
import p_core_web_vitals_that_matter from "./core-web-vitals-that-matter.json";
import p_customer_support_tooling from "./customer-support-tooling.json";
import p_dark_mode_properly from "./dark-mode-properly.json";
import p_data_pipelines_that_dont_lie from "./data-pipelines-that-dont-lie.json";
import p_design_systems_that_get_used from "./design-systems-that-get-used.json";
import p_designing_for_low_end_devices from "./designing-for-low-end-devices.json";
import p_ecommerce_checkout_conversion from "./ecommerce-checkout-conversion.json";
import p_erp_integration_without_a_rewrite from "./erp-integration-without-a-rewrite.json";
import p_estimating_software_honestly from "./estimating-software-honestly.json";
import p_feature_flags_done_right from "./feature-flags-done-right.json";
import p_flutter_vs_react_native from "./flutter-vs-react-native.json";
import p_freelance_vs_app_development_company_hyderabad from "./freelance-vs-app-development-company-hyderabad.json";
import p_google_business_profile_india_small_business from "./google-business-profile-india-small-business.json";
import p_gps_tracking_for_fleets from "./gps-tracking-for-fleets.json";
import p_hiring_engineers_that_stay from "./hiring-engineers-that-stay.json";
import p_kubernetes_when_you_need_it from "./kubernetes-when-you-need-it.json";
import p_localisation_beyond_translation from "./localisation-beyond-translation.json";
import p_microservices_when from "./microservices-when.json";
import p_migrating_off_legacy_php from "./migrating-off-legacy-php.json";
import p_migrating_to_app_router from "./migrating-to-app-router.json";
import p_mobile_app_development_cost_india from "./mobile-app-development-cost-india.json";
import p_mobile_app_security_checklist from "./mobile-app-security-checklist.json";
import p_mvp_scope_that_holds from "./mvp-scope-that-holds.json";
import p_observability_before_you_need_it from "./observability-before-you-need-it.json";
import p_onboarding_that_reduces_churn from "./onboarding-that-reduces-churn.json";
import p_payment_gateway_integration_pitfalls from "./payment-gateway-integration-pitfalls.json";
import p_push_notifications_that_work from "./push-notifications-that-work.json";
import p_qa_that_catches_real_bugs from "./qa-that-catches-real-bugs.json";
import p_realtime_features_without_websockets from "./realtime-features-without-websockets.json";
import p_recommendation_systems_cold_start from "./recommendation-systems-cold-start.json";
import p_rpa_where_it_pays from "./rpa-where-it-pays.json";
import p_running_effective_standups from "./running-effective-standups.json";
import p_saas_multi_tenancy_decisions from "./saas-multi-tenancy-decisions.json";
import p_security_basics_for_startups from "./security-basics-for-startups.json";
import p_tech_stack_for_a_new_startup from "./tech-stack-for-a-new-startup.json";
import p_technical_debt_conversations from "./technical-debt-conversations.json";
import p_top_mobile_app_development_companies_hyderabad from "./top-mobile-app-development-companies-hyderabad.json";
import p_webhooks_you_can_rely_on from "./webhooks-you-can-rely-on.json";
import p_whatsapp_business_api_india_small_business from "./whatsapp-business-api-india-small-business.json";
import p_when_not_to_build_an_app from "./when-not-to-build-an-app.json";
import p_why_your_app_needs_offline_support from "./why-your-app-needs-offline-support.json";

// Long-form posts in Growth Studio's shape (see src/lib/cms.ts). Add a post: drop <slug>.json here,
// its images in public/assets/blog/<slug>/, and add it to the list below.
// ponytail: `images` in each JSON holds the ChatGPT prompts used for its pictures; the page ignores it.
const SITE = "https://elevatebox.in";
const exists = (url: string) => fs.existsSync(path.join(process.cwd(), "public", url));

type Raw = Omit<CmsPost, "imageUrl" | "ogImageUrl"> & { imageUrl: string | null; ogImageUrl: string | null };

const rich = (p: Raw): CmsPost => {
  // Own cover once generated, else the brand cover already in /assets/pages, else the typographic card.
  const brand = `/assets/pages/blog-${p.slug}.webp`;
  const cover = p.imageUrl && exists(p.imageUrl) ? p.imageUrl : exists(brand) ? brand : null;
  return {
    ...p,
    // Figures whose image isn't generated yet are left out, so a post never shows a broken image.
    contentHtml: p.contentHtml.replace(/<figure><img src="(\/assets\/blog\/[^"]+)"[\s\S]*?<\/figure>/g, (fig, src: string) =>
      exists(src) ? fig : "",
    ),
    imageUrl: cover && SITE + cover,
    ogImageUrl: cover && SITE + cover,
  };
};

export const RICH_POSTS: CmsPost[] = ([
  p_ab_testing_small_traffic,
  p_accessibility_is_cheaper_early,
  p_ai_integration_existing_products,
  p_api_design_that_ages_well,
  p_app_maintenance_budget,
  p_app_store_rejections,
  p_building_for_bharat,
  p_choosing_a_database,
  p_choosing_a_development_partner,
  p_choosing_analytics_tools,
  p_choosing_cloud_provider,
  p_code_review_that_helps,
  p_content_seo_that_still_works,
  p_core_web_vitals_that_matter,
  p_customer_support_tooling,
  p_dark_mode_properly,
  p_data_pipelines_that_dont_lie,
  p_design_systems_that_get_used,
  p_designing_for_low_end_devices,
  p_ecommerce_checkout_conversion,
  p_erp_integration_without_a_rewrite,
  p_estimating_software_honestly,
  p_feature_flags_done_right,
  p_flutter_vs_react_native,
  p_freelance_vs_app_development_company_hyderabad,
  p_google_business_profile_india_small_business,
  p_gps_tracking_for_fleets,
  p_hiring_engineers_that_stay,
  p_kubernetes_when_you_need_it,
  p_localisation_beyond_translation,
  p_microservices_when,
  p_migrating_off_legacy_php,
  p_migrating_to_app_router,
  p_mobile_app_development_cost_india,
  p_mobile_app_security_checklist,
  p_mvp_scope_that_holds,
  p_observability_before_you_need_it,
  p_onboarding_that_reduces_churn,
  p_payment_gateway_integration_pitfalls,
  p_push_notifications_that_work,
  p_qa_that_catches_real_bugs,
  p_realtime_features_without_websockets,
  p_recommendation_systems_cold_start,
  p_rpa_where_it_pays,
  p_running_effective_standups,
  p_saas_multi_tenancy_decisions,
  p_security_basics_for_startups,
  p_tech_stack_for_a_new_startup,
  p_technical_debt_conversations,
  p_top_mobile_app_development_companies_hyderabad,
  p_webhooks_you_can_rely_on,
  p_whatsapp_business_api_india_small_business,
  p_when_not_to_build_an_app,
  p_why_your_app_needs_offline_support,
] as Raw[]).map(rich);
