<script lang="ts">
  const steps = [
    {
      number: '1',
      icon: '📸',
      title: 'Send a Photo',
      description: 'Message us on WhatsApp with a photo of your pet and describe the symptoms.'
    },
    {
      number: '2',
      icon: '🤖',
      title: 'AI Triage',
      description: 'Our AI analyzes the image and symptoms to assess urgency in seconds.'
    },
    {
      number: '3',
      icon: '👨‍⚕️',
      title: 'Connect to Vet',
      description: 'Get matched with a verified vet for a video consultation in under 2 minutes.'
    }
  ];
</script>

<section id="how-it-works" class="py-16 md:py-24 bg-primary-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12 md:mb-16">
      <h2 class="font-display text-h2 text-text-primary mb-4">
        How It Works
      </h2>
      <p class="text-body-lg text-text-secondary max-w-2xl mx-auto">
        Get expert pet care in three simple steps. No app download, no waiting rooms.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
      {#each steps as step, index}
        <div class="relative">
          <!-- Connector line (hidden on last item and mobile) -->
          {#if index < steps.length - 1}
            <div class="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-primary/20"></div>
          {/if}

          <div class="relative bg-surface rounded-card p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1">
            <!-- Step Number -->
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
              {step.number}
            </div>

            <!-- Icon -->
            <div class="text-5xl mb-4 mt-4">
              {step.icon}
            </div>

            <!-- Content -->
            <h3 class="font-display text-h3 text-text-primary mb-2">
              {step.title}
            </h3>
            <p class="text-body text-text-secondary">
              {step.description}
            </p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Demo Video Placeholder -->
    <div class="mt-12 md:mt-16 max-w-3xl mx-auto">
      <div class="bg-surface rounded-card overflow-hidden shadow-card-hover">
        <div class="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <button class="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-button hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </button>
        </div>
        <div class="p-4 text-center">
          <p class="text-small text-text-secondary">Watch how PetCare.ai works in 60 seconds</p>
        </div>
      </div>
    </div>
  </div>
</section>
