
import {
	IsEmail,
	IsLowercase,
	IsString,
	IsUrl,
	Length,
	IsOptional,
} from 'class-validator'

export default class CreatePostDto {
	@IsString()
	name: string

	@IsString()
	identity: string

	@IsEmail()
	email: string

	@IsUrl()
	picture: string

	@IsString()
	categoryId: string

	@IsString()
	coinName: string

	@IsString()
	@Length(3, 3)
	@IsLowercase()
	coinId: string

	@IsUrl()
	coinImage: string

	@IsOptional()
	@IsString()
	youtube?: string

	@IsOptional()
	@IsString()
	twitter?: string

	@IsOptional()
	@IsString()
	instagram?: string

	@IsOptional()
	@IsString()
	twitch?: string

	@IsOptional()
	@IsString()
	tiktok?: string
}
