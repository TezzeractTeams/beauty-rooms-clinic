# Google Consent Mode v2 Setup

## How It Works

Your site now tracks **all visitors** with GA4, but the tracking quality depends on consent:

| User Action | GA4 Tracking | Meta Pixel | Clarity |
|-------------|--------------|------------|---------|
| **No choice / Essential only** | ✅ Cookieless pings (basic page views, no user IDs) | ❌ Not loaded | ❌ Not loaded |
| **Accept all** | ✅ Full tracking (cookies, sessions, conversions) | ✅ Loaded | ✅ Loaded |

## Technical Implementation

### 1. Consent Defaults (`index.html`)
Before GTM loads, consent is set to **denied** for all optional storage:
- `analytics_storage: denied`
- `ad_storage: denied`
- `ad_user_data: denied`
- `ad_personalization: denied`

### 2. GA4 Loads for Everyone (`App.tsx`)
- GA4 loads immediately on page mount (not gated by consent)
- Respects Consent Mode signals automatically
- When denied: sends cookieless pings with limited data
- When granted: full measurement with cookies

### 3. Consent Updates (`gtmConsent.ts`)
When users choose:
- **Accept all** → updates consent to `granted` for analytics + ads
- **Essential only** → updates consent to `denied` for analytics + ads

### 4. Marketing Tools Gated
- **Meta Pixel** and **Clarity** only load after **Accept all**
- These are marketing/remarketing tools, not essential analytics

## GTM Configuration

Since you only have a Clarity tag in GTM:
1. **Delete or disable** the Clarity tag (we handle it in code now)
2. No other GTM configuration needed
3. GTM loads and receives consent signals, but doesn't fire any tags

## Privacy Compliance

This setup:
- ✅ Tracks all visitors (business need)
- ✅ Respects consent choices (privacy)
- ✅ Uses cookieless pings for non-consenters (GDPR-friendly)
- ✅ Gates marketing tools behind consent

**Note**: Update your Privacy Policy to reflect that basic GA4 analytics runs for everyone, with full tracking only after consent. Consult a privacy attorney for final compliance review.

## Testing

1. **DevTools → Network** tab:
   - Page load: see `google-analytics.com/g/collect` requests (cookieless)
   - After Accept all: see requests with cookies/user IDs

2. **GA4 Real-time reports**:
   - Should see traffic from all visitors
   - Users without consent = limited session data
   - Users with consent = full sessions

3. **Browser console**:
   ```javascript
   // Check consent state
   console.log(window.dataLayer);
   ```

## Files Changed
- `index.html` - Consent defaults
- `client/lib/gtmConsent.ts` - Consent sync logic
- `client/lib/loadOptionalAnalytics.ts` - Split GA4 vs marketing tools
- `client/App.tsx` - Load GA4 for everyone, marketing after consent
