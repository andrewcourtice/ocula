type Environment = 'development' | 'production';

export default function isEnv(environment: Environment): boolean {
    return process.env.NODE_ENV === environment;
}