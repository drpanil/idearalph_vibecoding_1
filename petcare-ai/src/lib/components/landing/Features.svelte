<script lang="ts">
  const features = [
    {
      icon: '🔍',
      title: 'AI Health Scanner',
      description: 'Send a photo and get instant AI-powered triage. Know if it\'s an emergency or can wait.',
      color: 'bg-primary-light'
    },
    {
      icon: '👨‍⚕️',
      title: '24/7 Vet Access',
      description: 'Connect with verified vets anytime, day or night. Average wait time under 2 minutes.',
      color: 'bg-secondary/10'
    },
    {
      icon: '📋',
      title: 'Pet Health Passport',
      description: 'All vaccinations, prescriptions, and medical records in one place. Never lose them again.',
      color: 'bg-accent/20'
    },
    {
      icon: '🗣️',
      title: 'Your Language',
      description: 'Chat in Hindi, Tamil, Telugu, or Kannada. We speak your language, literally.',
      color: 'bg-primary-light'
    }
  ];
</script>

<section id="features" class="py-16 md:py-24 bg-surface">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="font-display text-h2 text-text-primary mb-4">
        Everything Your Pet Needs
      </h2>
      <p class="text-body-lg text-text-secondary max-w-2xl mx-auto">
        From instant triage to complete health records, we've got your furry friend covered.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {#each features as feature}
        <div class="card text-center hover:border-primary border-2 border-transparent">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl {feature.color} flex items-center justify-center">
            <span class="text-3xl">{feature.icon}</span>
          </div>
          <h3 class="font-display text-h3 text-text-primary mb-2">
            {feature.title}
          </h3>
          <p class="text-body text-text-secondary">
            {feature.description}
          </p>
        </div>
      {/each}
    </div>

    <!-- Trust Bar -->
    <div class="mt-16 pt-12 border-t border-border">
      <p class="text-center text-small text-text-secondary mb-6">Trusted by pet parents in</p>
      <div class="flex flex-wrap justify-center gap-4 md:gap-8">
        {#each ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad'] as city}
          <div class="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2">
            <span class="text-sm">📍</span>
            <span class="text-small font-medium text-text-primary">{city}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
