import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../../projects/ui-components/src/lib/tailwind-components/badge.component';
import { CardComponent } from '../../../projects/ui-components/src/lib/tailwind-components/card.component';
import { ButtonComponent } from '../../../projects/ui-components/src/lib/tailwind-components/button.component';
import { AlertComponent } from '../../../projects/ui-components/src/lib/tailwind-components/alert.component';

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    CardComponent,
    ButtonComponent,
    AlertComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 py-12 px-4">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Biblioteca de Componentes UI
          </h1>
          <p class="text-xl text-gray-700">Componentes construídos com Tailwind CSS</p>
        </div>

        <!-- Alerts -->
        <ui-card [hasHeader]="true">
          <h2 header class="text-2xl font-bold text-gray-800">Alerts</h2>
          
          <div class="space-y-4">
            <ui-alert variant="success" title="Sucesso!">
              Sua tarefa foi criada com sucesso.
            </ui-alert>
            
            <ui-alert variant="warning" title="Atenção!">
              Você tem tarefas pendentes próximas do vencimento.
            </ui-alert>
            
            <ui-alert variant="danger" title="Erro!">
              Não foi possível salvar as alterações.
            </ui-alert>
            
            <ui-alert variant="info" title="Informação">
              Use os atalhos do teclado para navegar mais rápido.
            </ui-alert>
          </div>
        </ui-card>

        <!-- Badges -->
        <ui-card [hasHeader]="true">
          <h2 header class="text-2xl font-bold text-gray-800">Badges</h2>
          
          <div class="flex flex-wrap gap-3">
            <ui-badge variant="success" icon="pi pi-check">Concluída</ui-badge>
            <ui-badge variant="warning" icon="pi pi-clock">Pendente</ui-badge>
            <ui-badge variant="danger" icon="pi pi-exclamation-triangle">Urgente</ui-badge>
            <ui-badge variant="info" icon="pi pi-info-circle">Nova</ui-badge>
            <ui-badge variant="default" icon="pi pi-star">Favorita</ui-badge>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-3">Tamanhos</h3>
            <div class="flex flex-wrap items-center gap-3">
              <ui-badge variant="info" size="sm">Pequeno</ui-badge>
              <ui-badge variant="info" size="md">Médio</ui-badge>
              <ui-badge variant="info" size="lg">Grande</ui-badge>
            </div>
          </div>
        </ui-card>

        <!-- Buttons -->
        <ui-card [hasHeader]="true">
          <h2 header class="text-2xl font-bold text-gray-800">Buttons</h2>
          
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-3">Variantes</h3>
              <div class="flex flex-wrap gap-3">
                <ui-button variant="primary" icon="pi pi-check">Primary</ui-button>
                <ui-button variant="secondary" icon="pi pi-times">Secondary</ui-button>
                <ui-button variant="success" icon="pi pi-check-circle">Success</ui-button>
                <ui-button variant="danger" icon="pi pi-trash">Danger</ui-button>
                <ui-button variant="warning" icon="pi pi-exclamation-triangle">Warning</ui-button>
                <ui-button variant="info" icon="pi pi-info-circle">Info</ui-button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Tamanhos</h3>
              <div class="flex flex-wrap items-center gap-3">
                <ui-button variant="primary" size="xs">Extra Small</ui-button>
                <ui-button variant="primary" size="sm">Small</ui-button>
                <ui-button variant="primary" size="md">Medium</ui-button>
                <ui-button variant="primary" size="lg">Large</ui-button>
                <ui-button variant="primary" size="xl">Extra Large</ui-button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Estados</h3>
              <div class="flex flex-wrap gap-3">
                <ui-button variant="primary" icon="pi pi-check">Normal</ui-button>
                <ui-button variant="primary" [loading]="true">Loading</ui-button>
                <ui-button variant="primary" [disabled]="true">Disabled</ui-button>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Full Width</h3>
              <ui-button variant="primary" icon="pi pi-plus" [fullWidth]="true">
                Adicionar Nova Tarefa
              </ui-button>
            </div>
          </div>
        </ui-card>

        <!-- Cards -->
        <ui-card [hasHeader]="true">
          <h2 header class="text-2xl font-bold text-gray-800">Cards</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <ui-card [hasHeader]="true" [hasFooter]="true">
              <div header class="flex items-center gap-2">
                <i class="pi pi-user text-xl text-purple-600"></i>
                <span class="font-bold">Card com Header e Footer</span>
              </div>
              
              <p class="text-gray-700">
                Este é um exemplo de card com header e footer. Perfeito para exibir conteúdo estruturado.
              </p>
              
              <div footer class="flex gap-2 justify-end">
                <ui-button variant="secondary" size="sm">Cancelar</ui-button>
                <ui-button variant="primary" size="sm">Confirmar</ui-button>
              </div>
            </ui-card>

            <ui-card>
              <div class="text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <i class="pi pi-star text-white text-2xl"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">Card Simples</h3>
                <p class="text-gray-600">
                  Card sem header nem footer, ideal para conteúdo direto.
                </p>
              </div>
            </ui-card>
          </div>
        </ui-card>

        <!-- Exemplo Completo -->
        <ui-card [hasHeader]="true" [hasFooter]="true">
          <div header class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-800">Exemplo de Uso Real</h2>
            <ui-badge variant="info" icon="pi pi-bolt">Novo</ui-badge>
          </div>
          
          <ui-alert variant="info" title="Dica de Uso">
            Combine os componentes para criar interfaces complexas e bonitas!
          </ui-alert>
          
          <div class="mt-4 space-y-4">
            <div class="p-4 bg-gray-50 rounded-xl">
              <h3 class="font-bold mb-2">Informações do Projeto</h3>
              <p class="text-gray-600 mb-3">Status da tarefa e estatísticas gerais</p>
              <div class="flex gap-2">
                <ui-badge variant="success" size="sm">12 Concluídas</ui-badge>
                <ui-badge variant="warning" size="sm">5 Pendentes</ui-badge>
                <ui-badge variant="danger" size="sm">2 Atrasadas</ui-badge>
              </div>
            </div>
          </div>
          
          <div footer class="flex gap-2 justify-end">
            <ui-button variant="secondary" icon="pi pi-times">Fechar</ui-button>
            <ui-button variant="success" icon="pi pi-download">Exportar</ui-button>
            <ui-button variant="primary" icon="pi pi-save">Salvar</ui-button>
          </div>
        </ui-card>

      </div>
    </div>
  `,
  styles: []
})
export class ComponentsShowcaseComponent {}