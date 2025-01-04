import React from 'react';
import { 
  Star, 
  Play, 
  MessageCircle, 
  Globe,
  BookOpen,
  MessagesSquare,
  GraduationCap,
  UserCheck
} from 'lucide-react';
import type { SourcePlatform } from '../../types/source';

interface SourceIconProps {
  platform: SourcePlatform;
  className?: string;
}

const PLATFORM_ICONS = {
  amazon: Star,
  youtube: Play,
  x: MessageCircle,
  reddit: MessagesSquare,
  stackoverflow: Globe,
  scholar: GraduationCap,
  expert: UserCheck,
  web: BookOpen
};

const PLATFORM_COLORS = {
  amazon: 'text-yellow-400',
  youtube: 'text-red-400',
  x: 'text-white',
  reddit: 'text-orange-400',
  stackoverflow: 'text-blue-300',
  scholar: 'text-emerald-400',
  expert: 'text-purple-400',
  web: 'text-gray-300'
};

export function SourceIcon({ platform, className = '' }: SourceIconProps) {
  const Icon = PLATFORM_ICONS[platform];
  return <Icon className={`${PLATFORM_COLORS[platform]} ${className}`} />;
}