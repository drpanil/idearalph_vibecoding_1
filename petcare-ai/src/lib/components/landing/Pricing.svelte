<script lang="ts">
  const plans = [
    {
      name: 'Pay Per Consult',
      price: '149',
      period: 'per session',
      description: 'Perfect for occasional pet health questions',
      features: [
        'AI-powered triage',
        'Video consultation with vet',
        'Digital prescription',
        'WhatsApp support'
      ],
      cta: 'Start Chat',
      popular: false
    },
    {
      name: 'Pet Parent Plus',
      price: '499',
      period: 'per month',
      description: 'Best value for regular pet care needs',
      features: [
        'Unlimited consultations',
        'Priority vet matching',
        'Pet Health Passport',
        'Vaccination reminders',
        'Family plan (up to 3 pets)',
        '24/7 emergency support'
      ],
      cta: 'Get Started',
      popular: true
    }
  ];
</script>

<section id="pricing" class="py-16 md:py-24 bg-primary-light">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="font-display text-h2 text-text-primary mb-4">
        Simple, Transparent Pricing
      </h2>
      <p class="text-body-lg text-text-secondary max-w-2xl mx-auto">
        Quality pet healthcare that fits your budget. No hidden fees, ever.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {#each plans as plan}
        <div class="relative bg-surface rounded-card p-8 shadow-card {plan.popular ? 'border-2 border-primary' : ''}">
          {#if plan.popular}
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="bg-primary text-white text-label px-4 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </span>
            </div>
          {/if}

          <div class="text-center mb-6">
            <h3 class="font-display text-h3 text-text-primary mb-2">
              {plan.name}
            </h3>
            <div class="flex items-baseline justify-center gap-1">
              <span class="text-text-secondary">₹</span>
              <span class="text-5xl font-bold text-text-primary">{plan.price}</span>
              <span class="text-text-secondary">/{plan.period}</span>
            </div>
            <p class="text-small text-text-secondary mt-2">
              {plan.description}
            </p>
          </div>

          <ul class="space-y-3 mb-8">
            {#each plan.features as feature}
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="text-body text-text-secondary">{feature}</span>
              </li>
            {/each}
          </ul>

          <button class="{plan.popular ? 'btn-primary' : 'btn-secondary'} w-full">
            {plan.cta}
          </button>
        </div>
      {/each}
    </div>

    <!-- Money Back Guarantee -->
    <div class="text-center mt-8">
      <p class="text-small text-text-secondary">
        ✨ 100% satisfaction guarantee. Full refund if not happy with your first consultation.
      </p>
    </div>
  </div>
</section>
