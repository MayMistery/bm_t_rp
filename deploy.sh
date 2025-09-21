#!/bin/bash

# 🚀 AVR-Bench 一键部署脚本
# 支持多种部署方式

echo "🚀 AVR-Bench 部署工具"
echo "========================"

# 检查Node.js版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装Node.js"
    exit 1
fi

# 检查npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装npm"
    exit 1
fi

echo "✅ 环境检查通过"

# 构建项目
echo "📦 正在构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查错误"
    exit 1
fi

echo "✅ 构建成功"

# 部署菜单
echo ""
echo "请选择部署方式："
echo "1) GitHub Pages (推荐)"
echo "2) Vercel"
echo "3) Netlify"
echo "4) 本地预览"
echo ""

read -p "请输入选项 (1-4): " choice

case $choice in
    1)
        echo "📤 部署到 GitHub Pages..."
        
        # 检查是否已配置GitHub仓库
        if git remote get-url origin &> /dev/null; then
            repo_url=$(git remote get-url origin)
            echo "检测到GitHub仓库: $repo_url"
        else
            echo "❌ 请先配置GitHub仓库:"
            echo "1. 在GitHub创建仓库"
            echo "2. 运行: git remote add origin https://github.com/yourusername/avr-bench.git"
            echo "3. 运行: git push -u origin main"
            exit 1
        fi
        
        # 更新homepage配置
        read -p "请输入GitHub用户名: " username
        sed -i.bak "s/yourusername/$username/g" package.json
        
        # 部署
        npm run deploy
        
        echo "✅ 部署完成！"
        echo "访问地址: https://$username.github.io/avr-bench"
        ;;
        
    2)
        echo "📤 部署到 Vercel..."
        
        # 检查Vercel CLI
        if ! command -v vercel &> /dev/null; then
            echo "📥 正在安装Vercel CLI..."
            npm install -g vercel
        fi
        
        vercel --prod
        ;;
        
    3)
        echo "📤 部署到 Netlify..."
        
        # 检查Netlify CLI
        if ! command -v netlify &> /dev/null; then
            echo "📥 正在安装Netlify CLI..."
            npm install -g netlify-cli
        fi
        
        netlify deploy --prod --dir=build
        ;;
        
    4)
        echo "🔍 本地预览模式"
        echo "构建文件位于: build/"
        echo "可以使用以下命令预览:"
        echo "  npx serve -s build"
        echo "  python -m http.server 3000"
        echo "  或直接上传到静态托管服务"
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🎉 部署完成！"
echo "感谢使用AVR-Bench部署工具"