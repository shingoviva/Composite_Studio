import React, { ChangeEvent } from 'react';
import { AppState, ProfileData } from '../types';
import { UiLanguage } from '../App';

interface FormProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onImageClick: (imageId: string) => void;
  uiLanguage: UiLanguage;
}

const t = {
  en: {
    profileDetails: 'Profile Details',
    name: 'Name',
    bottom: 'Bottom',
    italic: 'Italic',
    contact: 'Contact',
    email: 'Email',
    agency: 'Agency / Represented By',
    physicalAttributes: 'Physical Attributes (Enter CM)',
    height: 'Height',
    bust: 'Bust',
    waist: 'Waist',
    hips: 'Hips',
    shoes: 'Shoes',
    hair: 'Hair',
    eyes: 'Eyes',
    additionalInfo: 'Additional Info (Optional)',
    nationality: 'Nationality',
    base: 'Base/Residence',
    experience: 'Experience / Highlights (Max 4)',
    highlight1: 'Highlight 1',
    highlight2: 'Highlight 2 (Optional)',
    highlight3: 'Highlight 3 (Optional)',
    highlight4: 'Highlight 4 (Optional)',
    photos: 'Photos',
    mainPhoto: 'Main Photo (Left Column)',
    subPhotos: 'Sub Photos (Right Column)',
    fitToFrame: 'Fit entire image (Show borders)'
  },
  ja: {
    profileDetails: 'プロフィール情報',
    name: '名前',
    bottom: '下部に配置',
    italic: 'イタリック',
    contact: '連絡先',
    email: 'メールアドレス',
    agency: '所属 / エージェンシー',
    physicalAttributes: '身体情報 (CMで入力)',
    height: '身長 (Height)',
    bust: 'バスト (Bust)',
    waist: 'ウエスト (Waist)',
    hips: 'ヒップ (Hips)',
    shoes: '靴 (Shoes)',
    hair: '髪 (Hair)',
    eyes: '目 (Eyes)',
    additionalInfo: '追加情報 (任意)',
    nationality: '国籍 (Nationality)',
    base: '拠点 (Base/Residence)',
    experience: '経歴 / 特記事項 (最大4つ)',
    highlight1: '特記事項 1',
    highlight2: '特記事項 2 (任意)',
    highlight3: '特記事項 3 (任意)',
    highlight4: '特記事項 4 (任意)',
    photos: '写真',
    mainPhoto: 'メイン写真 (左列)',
    subPhotos: 'サブ写真 (右列)',
    fitToFrame: '全体を収める（余白あり）'
  }
};

export default function Form({ state, setState, onImageClick, uiLanguage }: FormProps) {
  const lang = t[uiLanguage];

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }));
  };

  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: checked
      }
    }));
  };

  const handleFitModeChange = (key: keyof AppState['images'], checked: boolean) => {
    setState(prev => ({
      ...prev,
      images: {
        ...prev.images,
        [key]: {
          ...prev.images[key],
          fitMode: checked ? 'contain' : 'cover'
        }
      }
    }));
  };

  return (
    <div className="w-full h-full overflow-y-auto p-6 bg-white custom-scrollbar">
      <div className="space-y-8">
        
        {/* Profile Info Section */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a1a1aa] mb-4">
            {lang.profileDetails}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                <span>{lang.name}</span>
              </label>
              <input type="text" name="name" value={state.profile.name} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent mb-2" />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="nameAtBottom" 
                    checked={state.profile.nameAtBottom || false} 
                    onChange={handleToggle}
                    className="w-3 h-3 cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">{lang.bottom}</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="nameItalic" 
                    checked={state.profile.nameItalic || false} 
                    onChange={handleToggle}
                    className="w-3 h-3 cursor-pointer"
                  />
                  <span className="text-[10px] text-gray-500">{lang.italic}</span>
                </label>
                <select name="nameFont" value={state.profile.nameFont || '"Oswald", sans-serif'} onChange={handleProfileChange} className="text-[10px] text-gray-500 bg-transparent border-b border-gray-200 outline-none cursor-pointer">
                  <option value='"Oswald", sans-serif'>Oswald</option>
                  <option value='"Montserrat", sans-serif'>Montserrat</option>
                  <option value='"Playfair Display", serif'>Playfair Display</option>
                  <option value='"Inter", sans-serif'>Inter</option>
                  <option value='"Anton", sans-serif'>Anton</option>
                  <option value='"Bodoni Moda", serif'>Bodoni Moda</option>
                  <option value='"Cormorant Garamond", serif'>Cormorant Garamond</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                  <span>{lang.contact}</span>
                  <input type="checkbox" name="showContact" checked={state.profile.showContact} onChange={handleToggle} className="accent-black" title="Toggle visibility" />
                </label>
                <input type="text" name="contact" value={state.profile.contact} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
              </div>
              <div>
                <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                  <span>{lang.email}</span>
                  <input type="checkbox" name="showEmail" checked={state.profile.showEmail} onChange={handleToggle} className="accent-black" title="Toggle visibility" />
                </label>
                <input type="text" name="email" value={state.profile.email} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-1">{lang.agency}</label>
              <input type="text" name="agency" value={state.profile.agency} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
            </div>
          </div>
        </section>

        {/* Physical Attributes Section */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a1a1aa] mb-4">
            {lang.physicalAttributes}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'height', label: lang.height },
              { id: 'bust', label: lang.bust },
              { id: 'waist', label: lang.waist },
              { id: 'hips', label: lang.hips },
              { id: 'shoes', label: lang.shoes },
              { id: 'hair', label: lang.hair },
              { id: 'eyes', label: lang.eyes },
            ].map(field => (
              <div key={field.id} className={field.id === 'height' ? 'col-span-2' : ''}>
                <label className="block text-[10px] uppercase text-gray-400 mb-1">{field.label}</label>
                <input 
                  type="text" 
                  name={field.id} 
                  value={state.profile[field.id as keyof ProfileData] as string} 
                  onChange={handleProfileChange} 
                  className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* Additional Info Section */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a1a1aa] mb-4">
            {lang.additionalInfo}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
               <div>
                  <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                    <span>{lang.nationality}</span>
                    <input type="checkbox" name="showNationality" checked={state.profile.showNationality} onChange={handleToggle} className="accent-black" title="Toggle visibility" />
                  </label>
                  <input type="text" name="nationality" value={state.profile.nationality} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
               </div>
               <div>
                  <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                    <span>{lang.base}</span>
                    <input type="checkbox" name="showResidence" checked={state.profile.showResidence} onChange={handleToggle} className="accent-black" title="Toggle visibility" />
                  </label>
                  <input type="text" name="residence" value={state.profile.residence} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
               </div>
            </div>
            <div className="space-y-2">
               <label className="flex items-center justify-between text-[10px] uppercase text-gray-400 mb-1">
                 <span>{lang.experience}</span>
                 <input type="checkbox" name="showExperience" checked={state.profile.showExperience} onChange={handleToggle} className="accent-black" title="Toggle visibility" />
               </label>
               <input type="text" name="experience" placeholder={lang.highlight1} value={state.profile.experience} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
               <input type="text" name="experience2" placeholder={lang.highlight2} value={state.profile.experience2 || ''} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
               <input type="text" name="experience3" placeholder={lang.highlight3} value={state.profile.experience3 || ''} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
               <input type="text" name="experience4" placeholder={lang.highlight4} value={state.profile.experience4 || ''} onChange={handleProfileChange} className="w-full border-b border-gray-200 py-1 focus:border-black outline-none transition-colors text-sm font-medium bg-transparent" />
            </div>
          </div>
        </section>

        {/* Photos Section */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#a1a1aa] mb-4">
            {lang.photos}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-2">{lang.mainPhoto}</label>
              <button 
                onClick={() => onImageClick('main')}
                className="w-full aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden mb-2"
              >
                {state.images.main.croppedUrl ? (
                  state.images.main.fitMode === 'contain' ? (
                    <img src={state.images.main.originalUrl || state.images.main.croppedUrl} className="w-full h-full object-contain bg-white" />
                  ) : (
                    <img src={state.images.main.croppedUrl} className="w-full h-full object-cover" />
                  )
                ) : (
                  <span className="text-xs text-gray-400">+</span>
                )}
              </button>
              <label className="flex items-center gap-1.5 cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  checked={state.images.main.fitMode === 'contain'} 
                  onChange={(e) => handleFitModeChange('main', e.target.checked)}
                  className="w-3 h-3 cursor-pointer"
                />
                <span className="text-[10px] text-gray-500">{lang.fitToFrame}</span>
              </label>
            </div>
            
            <div>
              <label className="block text-[10px] uppercase text-gray-400 mb-2">{lang.subPhotos}</label>
              <div className="grid grid-cols-2 gap-3 gap-y-5">
                {['sub1', 'sub2', 'sub3', 'sub4'].map((key) => {
                  const imageKey = key as keyof AppState['images'];
                  const image = state.images[imageKey];
                  return (
                    <div key={key} className="flex flex-col">
                      <button 
                        onClick={() => onImageClick(key)}
                        className="w-full aspect-[3/4] bg-gray-100 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors relative overflow-hidden mb-1"
                      >
                        {image.croppedUrl ? (
                          image.fitMode === 'contain' ? (
                            <img src={image.originalUrl || image.croppedUrl} className="w-full h-full object-contain bg-white" />
                          ) : (
                            <img src={image.croppedUrl} className="w-full h-full object-cover" />
                          )
                        ) : (
                          <span className="text-xs text-gray-400">+</span>
                        )}
                      </button>
                      <label className="flex items-center gap-1.5 cursor-pointer mt-1">
                        <input 
                          type="checkbox" 
                          checked={image.fitMode === 'contain'} 
                          onChange={(e) => handleFitModeChange(imageKey, e.target.checked)}
                          className="w-3 h-3 cursor-pointer shrink-0"
                        />
                        <span className="text-[9px] text-gray-500 leading-tight">{lang.fitToFrame}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Basic styles for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e5e5;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
}
