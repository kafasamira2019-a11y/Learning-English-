import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Heart, Flame, Shield, Check, Zap } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface DuolingoShopViewProps {
  gems: number;
  hearts: number;
  streakDays: number;
  onBuyItem: (cost: number, itemType: string) => void;
}

export const DuolingoShopView: React.FC<DuolingoShopViewProps> = ({
  gems,
  hearts,
  streakDays,
  onBuyItem
}) => {
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);

  const shopItems = [
    {
      id: 'streak-freeze',
      titleEn: 'Streak Freeze',
      titleKh: 'ការពារ Streak មិនឱ្យដាច់',
      descriptionEn: 'Streak Freeze allows your streak to remain in place for one full day of inactivity.',
      descriptionKh: 'ជួយរក្សា Streak របស់អ្នកមិនឱ្យធ្លាក់ចុះសូន្យ ប្រសិនបើអ្នកភ្លេចរៀន ១ ថ្ងៃ។',
      cost: 200,
      icon: '🧊',
      category: 'boosts'
    },
    {
      id: 'heart-refill',
      titleEn: 'Refill Hearts (5/5)',
      titleKh: 'បំពេញបេះដូងឡើងវិញពេញ',
      descriptionEn: 'Get back to full health so you can keep practicing without waiting.',
      descriptionKh: 'ទទួលបានបេះដូង ៥ ពេញលេញវិញភ្លាមៗដើម្បីបន្តរៀន។',
      cost: 350,
      icon: '❤️',
      category: 'hearts'
    },
    {
      id: 'double-or-nothing',
      titleEn: 'Double or Nothing (Wager 50)',
      titleKh: 'ភ្នាល់រក្សា Streak ៧ ថ្ងៃ',
      descriptionEn: 'Attempt to maintain a 7 day streak to double your 50 gem wager.',
      descriptionKh: 'ភ្នាល់ 50 Gems! ប្រសិនបើរៀនជាប់គ្នាបាន ៧ ថ្ងៃ អ្នកនឹងទទួលបាន 100 Gems វិញ។',
      cost: 50,
      icon: '💎',
      category: 'boosts'
    },
    {
      id: 'super-pass',
      titleEn: 'Super Duo Academic Pass',
      titleKh: 'សមាជិកភាព Super Pro',
      descriptionEn: 'Unlimited hearts, offline access, detailed Murphy grammar diagnostic.',
      descriptionKh: 'បេះដូងគ្មានដែនកំណត់ និងចូលរៀនគ្រប់មេរៀនដោយឥតគិតថ្លៃ។',
      cost: 500,
      icon: '👑',
      category: 'pro'
    },
    {
      id: 'golden-suit',
      titleEn: 'Champ Golden Outfit for Duo',
      titleKh: 'ឈុតមាសជើងឯកសម្រាប់ Duo',
      descriptionEn: 'Dress Duo in a sparkling golden winner outfit!',
      descriptionKh: 'បំពាក់ឈុតមាសភ្លឺចែងចាំងឱ្យសត្វមៀម Duo។',
      cost: 400,
      icon: '✨',
      category: 'cosmetics'
    }
  ];

  const handlePurchase = (item: typeof shopItems[0]) => {
    if (gems < item.cost) {
      soundManager.playIncorrect();
      alert('You need more gems! Complete lessons to earn gems (អ្នកត្រូវការ Gems បន្ថែម) 💎');
      return;
    }

    soundManager.playComplete();
    setPurchasedItems(prev => [...prev, item.id]);
    onBuyItem(item.cost, item.id);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 select-none space-y-6">
      
      {/* Top Gems Balance Banner */}
      <div className="bg-[#1CB0F6] rounded-3xl p-6 text-white shadow-sm border-b-4 border-[#0F75A8] flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-wider text-sky-100">
            DUOLINGO STORE
          </span>
          <h1 className="text-2xl font-extrabold">
            Shop &amp; Power-ups
          </h1>
          <p className="text-sm font-khmer text-sky-100">
            ប្រើប្រាស់ Gems ដើម្បីទិញសម្ភារៈជំនួយ និងការពារ Streak<br/>
            <span className="font-sans text-[11px] opacity-80">(Use Gems to buy power-ups and protect your Streak)</span>
          </p>
        </div>

        <div className="bg-white/20 px-4 py-3 rounded-2xl flex items-center gap-2.5 backdrop-blur-xs border border-white/20">
          <span className="text-2xl">💎</span>
          <span className="text-2xl font-black">{gems}</span>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-4">
        {shopItems.map((item) => {
          const isOwned = purchasedItems.includes(item.id);
          const canAfford = gems >= item.cost;

          return (
            <div 
              key={item.id}
              className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-[#1CB0F6]/40 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-3xl shrink-0">
                  {item.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-800">
                      {item.titleEn}
                    </h3>
                    {item.category === 'pro' && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-black uppercase rounded-md">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-khmer text-[#1899D6] font-bold">
                    {item.titleKh}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                    {item.descriptionEn}
                  </p>
                  <p className="text-[11px] font-khmer text-slate-400">
                    {item.descriptionKh}
                  </p>
                </div>
              </div>

              {/* Buy Button */}
              <div className="shrink-0 w-full sm:w-auto">
                {isOwned ? (
                  <span className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-50 text-emerald-600 font-extrabold text-xs flex items-center justify-center gap-1.5 border border-emerald-200">
                    <Check className="w-4 h-4" />
                    <span>OWNED (មានរួចហើយ)</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-[#1899D6] hover:bg-[#1CB0F6] active:translate-y-0.5 text-white border-b-4 border-[#0F75A8] active:border-b-0 shadow-sm'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    <span>{item.cost}</span>
                    <span>💎</span>
                    <span>BUY</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
