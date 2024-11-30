type EventName =
  | 'page_view'
  | 'sign_up'
  | 'login'
  | 'logout'
  | 'project_create'
  | 'project_update'
  | 'project_delete'
  | 'subscription_started'
  | 'subscription_cancelled'
  | 'error_occurred';

interface AnalyticsEvent {
  name: EventName;
  properties?: Record<string, any>;
  timestamp?: number;
  userId?: string;
}

class Analytics {
  private static instance: Analytics;
  private initialized = false;
  private queue: AnalyticsEvent[] = [];

  private constructor() {}

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  init() {
    if (this.initialized) return;

    // Initialize analytics services
    if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
      // Initialize Google Analytics
      console.log('Analytics initialized');
    }

    // Process any queued events
    this.processQueue();
    
    this.initialized = true;
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) {
        this.trackEvent(event.name, event.properties, event.userId);
      }
    }
  }

  trackEvent(name: EventName, properties?: Record<string, any>, userId?: string) {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      userId,
    };

    if (!this.initialized) {
      this.queue.push(event);
      return;
    }

    // In development, just log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
      return;
    }

    // In production, send to analytics service
    // Add production analytics tracking logic here
  }

  trackPageView(path: string, userId?: string) {
    this.trackEvent('page_view', { path }, userId);
  }

  trackError(error: Error, context?: Record<string, any>, userId?: string) {
    this.trackEvent(
      'error_occurred',
      {
        error: error.message,
        stack: error.stack,
        ...context,
      },
      userId
    );
  }
}

export const analytics = Analytics.getInstance();
